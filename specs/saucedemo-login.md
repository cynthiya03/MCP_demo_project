# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com/
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-17

## Overview
This plan covers the SauceDemo login form for a successful standard-user login, a locked account, missing credentials, and invalid credentials. Each scenario starts from a fresh login page and verifies the visible result as well as the relevant URL or error message.

## Preconditions
- The test runs against `https://www.saucedemo.com/` in a clean browser context.
- The login form is visible with accessible fields named `Username` and `Password`, and a `Login` button.
- Use `secret_sauce` as the password for every scenario that enters a password.
- Do not retain cookies, local storage, or session state between scenarios.

## Scenarios

### Scenario 1.1 — Standard user logs in successfully
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** The login page is displayed with empty username and password fields.
- **Steps:**
  1. Enter `standard_user` in `Username` — expected: the username field contains `standard_user`.
  2. Enter `secret_sauce` in `Password` — expected: the password field contains a masked value.
  3. Activate `Login` — expected: the app navigates to the inventory page.
- **Assertions:**
  - The URL is `https://www.saucedemo.com/inventory.html`.
  - The page exposes the `Products` heading and no login error is visible.
- **Edge cases considered:** A valid user must not be rejected; the password should remain masked.

### Scenario 1.2 — Locked-out user sees a locked error
- **Priority:** P0
- **Tags:** @regression @critical
- **Preconditions:** The login page is displayed with no existing session.
- **Steps:**
  1. Enter `locked_out_user` in `Username` — expected: the username field contains the locked account name.
  2. Enter `secret_sauce` in `Password` — expected: the password field contains a masked value.
  3. Activate `Login` — expected: the login page remains visible and an error is shown.
- **Assertions:**
  - The error contains `Epic sadface: Sorry, this user has been locked out.`.
  - The URL remains `https://www.saucedemo.com/` and the inventory page is not shown.
- **Edge cases considered:** A correct password does not bypass account lockout; the form remains available for another attempt.

### Scenario 1.3 — Empty username is rejected
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** The login page is displayed with both fields empty.
- **Steps:**
  1. Leave `Username` empty — expected: no username is entered.
  2. Enter `secret_sauce` in `Password` — expected: the password field contains a masked value.
  3. Activate `Login` — expected: submission is rejected on the login page.
- **Assertions:**
  - The error contains `Epic sadface: Username is required`.
  - The URL remains `https://www.saucedemo.com/` and no inventory content is displayed.
- **Edge cases considered:** Client-side or server-side validation must identify the missing username rather than reporting a generic credential failure.

### Scenario 1.4 — Empty password is rejected
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** The login page is displayed with both fields empty.
- **Steps:**
  1. Enter `standard_user` in `Username` — expected: the username field contains `standard_user`.
  2. Leave `Password` empty — expected: no password is entered.
  3. Activate `Login` — expected: submission is rejected on the login page.
- **Assertions:**
  - The error contains `Epic sadface: Password is required`.
  - The URL remains `https://www.saucedemo.com/` and no inventory content is displayed.
- **Edge cases considered:** A valid username without a password must produce the password-specific validation message.

### Scenario 1.5 — Invalid credentials are rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** The login page is displayed with no existing session.
- **Steps:**
  1. Enter `invalid_user` in `Username` — expected: the username field contains `invalid_user`.
  2. Enter `secret_sauce` in `Password` — expected: the password field contains a masked value.
  3. Activate `Login` — expected: the login page remains visible and an error is shown.
- **Assertions:**
  - The error contains `Epic sadface: Username and password do not match any user in this service`.
  - The URL remains `https://www.saucedemo.com/` and the inventory page is not shown.
- **Edge cases considered:** An unknown username with the shared password must not create a session; the error must differ from the locked-account message.

## Not covered (and why)
- Other documented SauceDemo users are excluded because the requested coverage is limited to the standard and locked accounts plus validation failures.
- Logout and authenticated inventory workflows are excluded because they are outside the login-flow request.
- Whitespace-only, case-variant, and malformed credential inputs are excluded because they were not requested.