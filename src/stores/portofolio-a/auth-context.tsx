"use client";
// Simulated auth/session store. Session persists to localStorage. Login picks a
// role; the session identity is the representative team member for that role.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TEAM } from "@/mocks/portofolio-a/data";
import { recordAudit } from "@/lib/portofolio-a/audit";
import type { Role, SessionUser } from "@/types/portofolio-a";

const SESSION_KEY = "crm:session:v1";

interface AuthContextValue {
  user: SessionUser | null;
  hydrated: boolean;
  login: (role: Role) => SessionUser;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function userForRole(role: Role): SessionUser {
  const member = TEAM.find((m) => m.role === role) ?? TEAM[0];
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role,
    avatarSeed: member.avatarSeed,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as SessionUser);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: SessionUser | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback(
    (role: Role) => {
      const next = userForRole(role);
      persist(next);
      recordAudit(next, {
        action: "login",
        entityType: "session",
        entityId: next.id,
        after: { role, name: next.name },
      });
      queryClient.invalidateQueries({ queryKey: ["audit"] });
      return next;
    },
    [persist, queryClient]
  );

  const logout = useCallback(() => {
    if (user) {
      recordAudit(user, {
        action: "logout",
        entityType: "session",
        entityId: user.id,
        before: { role: user.role, name: user.name },
      });
      queryClient.invalidateQueries({ queryKey: ["audit"] });
    }
    persist(null);
  }, [user, persist, queryClient]);

  const switchRole = useCallback(
    (role: Role) => {
      if (!user || user.role === role) return;
      const next = userForRole(role);
      recordAudit(user, {
        action: "role_change",
        entityType: "user",
        entityId: next.id,
        before: { role: user.role, name: user.name },
        after: { role, name: next.name },
      });
      persist(next);
      queryClient.invalidateQueries({ queryKey: ["audit"] });
    },
    [user, persist, queryClient]
  );

  const value = useMemo(
    () => ({ user, hydrated, login, logout, switchRole }),
    [user, hydrated, login, logout, switchRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
