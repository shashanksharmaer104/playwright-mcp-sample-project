import { test, expect } from '@playwright/test';

test('search for T-shirts and verify result', async ({ page }) => {
  await page.goto('http://www.automationpractice.pl/index.php');
  await page.getByRole('textbox', { name: 'Search' }).fill('T-shirts');
  await page.keyboard.press('Enter');
  await expect(page.locator('#center_column').getByRole('heading', { name: 'Faded Short Sleeve T-shirts' })).toBeVisible();
});
