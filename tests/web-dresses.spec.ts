import { test, expect } from '@playwright/test';
import { DressesPage } from './pages/DressesPage';

test.describe('Verify Dresses page scenario', () => {
  test('should verify dresses page with subcategories and product availability', async ({ page }) => {
    const dressesPage = new DressesPage(page);

    // Step 1: User open web URL
    await dressesPage.goto();

    // Step 2: Click on 'DRESSES' button under navigation header
    await dressesPage.clickDressesButton();
    await page.waitForLoadState('networkidle');

    // Step 3: Verify that there are 3 subcategories displayed
    const subcategoriesCount = await dressesPage.getSubcategoriesCount();
    expect(subcategoriesCount).toBe(3);

    // Step 4: Verify and assert that 5 items are displayed as result in results section
    const productsCount = await dressesPage.getProductsCount();
    expect(productsCount).toBe(5);

    // Step 5: User clicks or open last item
    await dressesPage.clickLastProduct();
    await page.waitForLoadState('networkidle');

    // Step 6: Verify that "This product is no longer in stock with those attributes but is available with others." message is displayed
    const stockMessage = await dressesPage.getStockMessage();
    expect(stockMessage).toContain('This product is no longer in stock with those attributes but is available with others');
  });
});
