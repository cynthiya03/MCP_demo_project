import { Locator, Page } from '@playwright/test';
import { BasePage } from './BbasePage';

export class InventoryPage extends BasePage {
  readonly productSort: Locator;

  constructor(page: Page) {
    super(page);
    this.productSort = page.getByRole('combobox', { name: 'Sort products' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }
}