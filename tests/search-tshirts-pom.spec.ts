import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';

test.describe('Search T-shirts', () => {
  test('should find Faded Short Sleeve T-shirts in results', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await homePage.searchFor('T-shirts');

    const isVisible = await searchResultsPage.isProductVisible('Faded Short Sleeve T-shirts');
    expect(isVisible).toBeTruthy();
  });
  
});
