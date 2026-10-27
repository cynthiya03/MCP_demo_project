import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('SauceDemo standard login', () => {
  test('logs in as a standard user @smoke @critical', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    const inventory = await login.loginAs(users.standard);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventory.productSort).toBeVisible();
  });
});