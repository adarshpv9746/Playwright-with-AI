# OrangeHRM Dashboard Test Plan

## Application Overview

Validate that a fresh user can log in to the public OrangeHRM demo and reach a usable dashboard with its primary navigation, work summary, action widgets, and quick-launch controls. The public demo credentials shown on the login page are used: Admin / admin123.

## Test Scenarios

### 1. OrangeHRM dashboard access and content

**Seed:** `seed.spec.ts`

#### 1.1. should log in and display the OrangeHRM dashboard

**File:** `specs/orangehrm-dashboard.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login.
    - expect: The OrangeHRM Login page is displayed with Username, Password, and Login controls.
  2. Fill the Username field with Admin and the Password field with admin123, then click Login.
    - expect: The browser navigates to /web/index.php/dashboard/index.
    - expect: The page heading Dashboard is visible.
    - expect: No login error is shown.
  3. Verify the left navigation contains Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, and Buzz.
    - expect: All expected dashboard navigation entries are visible.
  4. Verify the dashboard cards/sections Time at Work, My Actions, Quick Launch, and Buzz Latest Posts are visible.
    - expect: Each primary dashboard section is visible.
  5. Verify the Quick Launch controls Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet are visible and enabled.
    - expect: All six quick-launch controls are present and actionable.
  6. Click the Dashboard navigation item after confirming the dashboard is loaded.
    - expect: The dashboard remains loaded at /web/index.php/dashboard/index.
  7. In an independent negative-check scenario, open a fresh login page, submit an incorrect password for Admin, and do not continue to the dashboard.
    - expect: A login validation/error message is displayed.
    - expect: The URL remains on the authentication page and the Dashboard heading is not present.
