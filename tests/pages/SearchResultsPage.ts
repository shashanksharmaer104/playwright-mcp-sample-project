import { Page } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productNameSelector = 'a.product-name';

  constructor(page: Page) {
    this.page = page;
  }

  async isProductVisible(productName: string): Promise<boolean> {
    const productNames = await this.page.locator(this.productNameSelector).allTextContents();
    return productNames.some(name => name.trim() === productName);
  }
}
