import { test, expect } from '@playwright/test';

const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.describe('OrangeHRM dashboard access and content', () => {
  test('should log in and display the OrangeHRM dashboard', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to the OrangeHRM login page.
    await page.goto(loginUrl);

    // 2. Verify the Username, Password, and Login controls are present.
    await expect(page.getByRole('textbox', { name: 'Username', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 3. Log in using the demo credentials.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Verify navigation to the dashboard and the Dashboard heading.
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 5. Verify the expected sidebar navigation entries.
    for (const item of [
      'Admin',
      'PIM',
      'Leave',
      'Time',
      'Recruitment',
      'My Info',
      'Performance',
      'Dashboard',
      'Directory',
      'Maintenance',
      'Claim',
      'Buzz',
    ]) {
      await expect(page.getByRole('link', { name: item, exact: true })).toBeVisible();
    }

    // 6. Verify the primary dashboard sections.
    for (const section of ['Time at Work', 'My Actions', 'Quick Launch', 'Buzz Latest Posts']) {
      await expect(page.getByText(section, { exact: true })).toBeVisible();
    }

    // 7. Verify all Quick Launch controls are visible and enabled.
    for (const action of [
      'Assign Leave',
      'Leave List',
      'Timesheets',
      'Apply Leave',
      'My Leave',
      'My Timesheet',
    ]) {
      await expect(page.getByRole('button', { name: action, exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: action, exact: true })).toBeEnabled();
    }

    // 8. Confirm selecting the Dashboard navigation item keeps the dashboard loaded.
    await page.getByRole('link', { name: 'Dashboard', exact: true }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should reject invalid OrangeHRM credentials', async ({ page }) => {
    // 1. Open a fresh login page and submit an incorrect password for Admin.
    await page.goto(loginUrl);
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('incorrect-password');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Verify the authentication error and confirm the dashboard is not shown.
    await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).not.toBeVisible();
  });
});
