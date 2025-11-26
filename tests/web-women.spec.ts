import { test, expect } from '@playwright/test';
import { WomenPage } from './pages/WomenPage';

test.describe('Verify Women navigation scenario', () => {
  test('should verify Women menu with subcategories and product availability', async ({ page }) => {
    const womenPage = new WomenPage(page);

    // Step 1: Launch the browser and open web URL
    await womenPage.goto();

    // Step 2: Hover mouse on 'WOMEN' button/link under navigation header
    await womenPage.hoverWomenButton();

    // Step 3: Wait for options to appear on UI (implicit wait in getter methods)

    // Step 4: Verify that 2 options are displayed under TOPS section and 3 options are displayed under DRESSES
    const topsCount = await womenPage.getTopsOptionsCount();
    expect(topsCount).toBe(2);

    const dressesCount = await womenPage.getDressesOptionsCount();
    expect(dressesCount).toBe(3);

    // Step 5: Click on 'Blouses' link/button
    await womenPage.clickBlousesLink();

    // Step 6: Wait for page to load
    await page.waitForLoadState('networkidle');

    // Step 7: Verify that one result is displayed under Showing section
    const productCountText = await womenPage.getProductCountText();
    expect(productCountText).toContain('Showing 1');
  });
});
