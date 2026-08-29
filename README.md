# Personal Portfolio + CRM

A Next.js (App Router) portfolio site whose **Portfolio** section links to live builds.
The flagship build is **CRM** — a frontend-only enterprise CRM dashboard at
`/portofolio-a` with role-based access control, a drag-and-drop deal pipeline, and an
append-only audit trail.

> Everything in the CRM is a **frontend simulation**. No backend, database, API server,
> or cloud service is involved. Auth, sessions, RBAC, and the audit log all run in the
> browser; data lives in memory and persists optionally to `localStorage`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  (portfolio)  ·  /portofolio-a (CRM)
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next lint) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit + component tests (Vitest) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright end-to-end (`npx playwright install` first) |

## Tech stack

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS v4 · TanStack Query ·
Axios (mock adapter) · React Hook Form + Zod · TanStack Table · Recharts · dnd-kit ·
framer-motion · Vitest + Testing Library · Playwright.

## CRM features

- **Auth simulation** — pick one of 7 roles at `/portofolio-a/login`; the session is stored locally and switchable from the top bar.
- **RBAC, enforced 3 layers deep** — route guard (page), component guard (`<Can>` for widgets/menus), and action guard (buttons). Unauthorized routes render a 403 page; the sidebar shows only what the role can reach.
- **Dashboard** — KPI cards, revenue trend (Recharts, lazy-loaded), pipeline snapshot, recent activity from the audit trail.
- **Leads** — TanStack Table with search, sort, pagination, column toggles; full CRUD.
- **Deals** — dnd-kit Kanban; dragging a card records a `move_stage` event (requires `deals.move`).
- **Contacts** — table + detail panel with editable tags and notes.
- **Tasks** — filterable list with quick inline status changes.
- **Team & Roles** — assign roles (logged as `role_change`), activate/deactivate members, and a live permission preview per role.
- **Audit Log** — append-only, filterable by actor/action/entity/date, searchable, and exportable to CSV.
- **Settings** — org profile, table density, and a CRM-scoped light/dark/system theme.

### Roles & permissions

Seven roles — `super_admin`, `admin`, `sales_manager`, `sales_rep`, `support`,
`finance`, `viewer` — over granular permissions (`leads.*`, `deals.*`, `contacts.*`,
`tasks.*`, `users.*`, `audit.read`, `settings.manage`). The matrix lives in
`src/lib/portofolio-a/rbac.ts`.

### Role-based demo

1. Open `/portofolio-a` → redirected to the login/role picker.
2. **Enter as `viewer`** — read-only. Create/edit/delete buttons disappear; visiting `/portofolio-a/team` or `/portofolio-a/settings` shows a 403.
3. **Switch to `sales_rep`** (top-bar role selector) — Leads/Deals/Tasks become editable; Kanban drag works; Team & Audit stay hidden.
4. **Switch to `super_admin`** — everything unlocks, including Team, Audit, and Settings.
5. Perform any create/update/delete/move, then open **Audit Log** — the event is there with actor, role, before/after, and request id. Export the filtered view to CSV.

Changing role updates access **instantly** — no reload — because guards read the live session.

## Architecture

```
src/
  app/portofolio-a/            # CRM routes (login + (dashboard) group)
  components/portofolio-a/      # ui primitives + app shell/layout
  features/portofolio-a/        # auth, dashboard, leads, deals, contacts, tasks, team, audit, settings
  hooks/portofolio-a/           # use-crm, use-permission, use-audit-logger
  lib/portofolio-a/             # rbac, api (axios mock adapter), audit, csv, format, id, cn
  mocks/portofolio-a/           # seed data
  stores/portofolio-a/          # in-memory db + auth/theme/toast contexts
  types/portofolio-a/           # domain types
```

- **Mock API** — a real Axios instance with a custom adapter routes REST-ish calls to the in-memory DB (`src/lib/portofolio-a/api.ts`), so the app uses genuine Axios/TanStack Query flows with zero network.
- **Audit** — every mutation logs through the hook layer (which knows the actor); the trail is append-only.
- **Persistence** — `localStorage` keys `crm:db:v1`, `crm:session:v1`, `crm:theme:v1`. Clear them to reset.

## ARK Design — landing page (`/portofolio-b`)

A second frontend-only build: a premium landing page for **ARK Design**, a modern-minimalist
architecture & construction studio. Open `http://localhost:3000/portofolio-b`.

> Frontend only. No backend, database, or API. Content is local mock data; the contact
> form validates and simulates a submit entirely in the browser (nothing is sent).

### Design system

- **Palette** (scoped under `.ark` in `globals.css`, never leaks to the rest of the app):
  bone `#F7F5F0` · charcoal `#17181A` · concrete `#6B6F76` · hairline `#E2DFD8` ·
  brass-amber accent `#C79A3A`.
- **Type** — `Outfit` (display + body) + `Space Grotesk` (technical labels), self-hosted via `next/font`.
- **Visuals** — real photos drop into `ImageSlot` placeholders under `/public/portofolio-b/…`;
  until then each slot renders a labelled blueprint placeholder (zero external image requests).
- **Motion** — `framer-motion` reveals/stagger, isolated in client leaves; respects `prefers-reduced-motion`.

### Sections

Sticky nav · Hero · Tentang · Keunggulan · Layanan (5) · Portofolio (filterable) ·
Proses kerja (5 tahap) · Testimoni · FAQ (accordion) · CTA · Kontak (form) · Footer.

### Feature checklist

- [x] Responsive (mobile / tablet / desktop), hero uses `min-h-[100dvh]`, no horizontal scroll
- [x] Sticky navbar, transparent→solid on scroll, smooth-scroll anchors, mobile menu (scroll-lock)
- [x] Portfolio category filter with animated `layout` reflow + empty state
- [x] Accessible accordion (aria-expanded / keyboard), aria-labelledby on every section
- [x] Contact form — React Hook Form + Zod, inline errors, loading + success + error states
- [x] SEO — per-page metadata, Open Graph + Twitter, `GeneralContractor` JSON-LD, H1→H2→H3
- [x] `next/image` on all slots (hero `priority`, `sizes` set), no new dependencies added

### Structure (feature-first + shared layer)

```
src/
  app/portofolio-b/            # layout (fonts + metadata + JSON-LD) + page
  components/portofolio-b/
    ui/                        # Button, ButtonLink, SectionHeading, Container, Kicker,
                               # Badge, ImageSlot, Section, Reveal, Accordion, Input/Textarea/Select,
                               # ProjectCard, TestimonialCard, CtaBanner
    layout/                    # Navbar, MobileMenu (in Navbar), Footer, Wordmark
  features/portofolio-b/
    hero services about portfolio process testimonials faq contact cta   # each: components/ data/ [types]
    shared/                    # motion variants, tokens, nav/brand constants
  lib/portofolio-b/cn.ts
```

Contact validation lives in `features/portofolio-b/contact/schema.ts` (Zod);
the submit lifecycle is in `contact/hooks/useContactForm.ts`.

**Adding real photos:** drop files into `public/portofolio-b/…` matching the paths shown
in each placeholder, then pass `src` to the `ImageSlot` (or wire the project's `imagePath`).

## Tests

- **Unit** — `rbac.test.ts` (permission checker + resource/role guard), `audit.test.ts` (audit-entry builder).
- **Component** — `DataTable.test.tsx` (render, global-search filtering, empty state) covering the leads-style table.
- **E2E** (Playwright) — `e2e/portofolio-a.spec.ts`: unauthenticated redirect, role-gated route protection (403), and audit-entry creation on login.

```bash
npm test                 # unit + component
npx playwright install   # one-time browser download
npm run test:e2e         # end-to-end
```
