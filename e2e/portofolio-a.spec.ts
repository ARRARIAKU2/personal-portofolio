import { test, expect } from "@playwright/test";

// The CRM is a frontend-only simulation; these flows exercise the RBAC layers
// and the audit trail end to end in the browser.

test("unauthenticated visits are redirected to login", async ({ page }) => {
  await page.goto("/portofolio-a/dashboard");
  await expect(page).toHaveURL(/\/portofolio-a\/login/);
  await expect(
    page.getByRole("heading", { name: "Choose your role" })
  ).toBeVisible();
});

test("role switching gates protected routes and writes an audit entry", async ({
  page,
}) => {
  // Sign in as Viewer (read-only, no team/audit access).
  await page.goto("/portofolio-a/login");
  await page.getByRole("button", { name: /Viewer/ }).first().click();
  await page.getByRole("button", { name: /Enter workspace as Viewer/ }).click();
  await expect(page).toHaveURL(/\/portofolio-a\/dashboard/);

  // Route protection: Viewer cannot reach Team & Roles.
  await page.goto("/portofolio-a/team");
  await expect(
    page.getByRole("heading", { name: /403 — Access denied/ })
  ).toBeVisible();

  // Sign out, sign back in as Super Admin, and confirm the login audit entry.
  await page.goto("/portofolio-a/login");
  await page.getByRole("button", { name: /Super Admin/ }).first().click();
  await page
    .getByRole("button", { name: /Enter workspace as Super Admin/ })
    .click();
  await expect(page).toHaveURL(/\/portofolio-a\/dashboard/);

  await page.goto("/portofolio-a/audit");
  await expect(page.getByRole("heading", { name: "Audit Log" })).toBeVisible();
  await expect(page.getByText("login").first()).toBeVisible();
});
