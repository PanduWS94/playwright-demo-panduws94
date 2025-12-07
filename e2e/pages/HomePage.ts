import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }

    async goToMenu(subMenu: string) {
        await this.page.getByRole('heading', { name: 'Elements' }).click();
        await this.page.getByRole('listitem').getByText(subMenu, { exact: true }).click();
        await expect(this.page.locator('h1', { hasText: subMenu })).toBeVisible();
    }
}
