import { Page, Locator } from '@playwright/test';

export class DressesPage {
  readonly page: Page;
  readonly dressesButton = 'a[title="Dresses"]';
  readonly subcategoriesSection = '.subcategories';
  readonly subcategoryItems = '.subcategories li';
  readonly productItems = '.product_list.grid li.ajax_block_product';
  readonly lastProductItem = '.product_list.grid li.ajax_block_product:last-child';
  readonly stockMessage = 'p.warning.alt';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async clickDressesButton() {
    await this.page.click(this.dressesButton);
  }

  async getSubcategoriesCount(): Promise<number> {
    const subcategories = await this.page.locator(this.subcategoryItems);
    return await subcategories.count();
  }

  async getProductsCount(): Promise<number> {
    const products = await this.page.locator(this.productItems);
    return await products.count();
  }

  async clickLastProduct() {
    const lastProduct = this.page.locator(this.lastProductItem);
    await lastProduct.locator('a.product_img_link').click();
  }

  async getStockMessage(): Promise<string | null> {
    const message = this.page.locator(this.stockMessage);
    const isVisible = await message.isVisible();
    if (isVisible) {
      return await message.textContent();
    }
    return null;
  }
}
