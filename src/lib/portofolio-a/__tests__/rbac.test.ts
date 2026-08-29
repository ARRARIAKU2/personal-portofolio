import { describe, expect, it } from "vitest";
import {
  canAccessResource,
  hasAll,
  hasAny,
  hasPermission,
  ROLE_PERMISSIONS,
} from "@/lib/portofolio-a/rbac";

describe("permission checker", () => {
  it("super_admin holds every permission", () => {
    for (const p of ROLE_PERMISSIONS.super_admin) {
      expect(hasPermission("super_admin", p)).toBe(true);
    }
    expect(hasPermission("super_admin", "settings.manage")).toBe(true);
  });

  it("viewer cannot mutate", () => {
    expect(hasPermission("viewer", "leads.read")).toBe(true);
    expect(hasPermission("viewer", "leads.create")).toBe(false);
    expect(hasPermission("viewer", "deals.move")).toBe(false);
  });

  it("null/undefined role is denied", () => {
    expect(hasPermission(null, "leads.read")).toBe(false);
    expect(hasPermission(undefined, "leads.read")).toBe(false);
  });

  it("hasAll requires every listed permission", () => {
    expect(hasAll("sales_rep", ["leads.read", "deals.read"])).toBe(true);
    expect(hasAll("sales_rep", ["leads.read", "users.manage"])).toBe(false);
  });

  it("hasAny requires at least one", () => {
    expect(hasAny("support", ["users.manage", "contacts.read"])).toBe(true);
    expect(hasAny("viewer", ["leads.create", "deals.delete"])).toBe(false);
  });
});

describe("role guard (resource access)", () => {
  it("gates the users resource behind read or manage", () => {
    expect(canAccessResource("super_admin", "users")).toBe(true);
    expect(canAccessResource("sales_rep", "users")).toBe(false);
  });

  it("gates settings behind manage", () => {
    expect(canAccessResource("admin", "settings")).toBe(true);
    expect(canAccessResource("finance", "settings")).toBe(false);
  });

  it("every role can reach a resource it can read", () => {
    expect(canAccessResource("viewer", "leads")).toBe(true);
    expect(canAccessResource("finance", "deals")).toBe(true);
  });
});
