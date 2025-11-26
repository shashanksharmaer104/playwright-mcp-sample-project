import { Page } from '@playwright/test';

export class WomenPage {
  readonly page: Page;
  readonly womenButton = 'a[title="Women"]';
  readonly topsSection = '.sf-menu > li:nth-child(1) > ul > li:nth-child(1) > ul';
  readonly dressesSection = '.sf-menu > li:nth-child(1) > ul > li:nth-child(2) > ul';
  readonly blousesLink = 'a[title="Blouses"]';
  readonly productCount = '.product-count';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async hoverWomenButton() {
    await this.page.hover(this.womenButton);
  }

  async getTopsOptionsCount(): Promise<number> {
    await this.page.waitForSelector(this.topsSection, { state: 'visible' });
    const topsOptions = await this.page.locator(`${this.topsSection} > li`);
    return await topsOptions.count();
  }

  async getDressesOptionsCount(): Promise<number> {
    await this.page.waitForSelector(this.dressesSection, { state: 'visible' });
    const dressesOptions = await this.page.locator(`${this.dressesSection} > li`);
    return await dressesOptions.count();
  }

  async clickBlousesLink() {
    await this.page.click(this.blousesLink);
  }

  async getProductCountText(): Promise<string> {
    await this.page.waitForSelector(this.productCount, { state: 'visible' });
    return await this.page.textContent(this.productCount) || '';
  }
}
