import { Page, expect } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) { }


    async goToMenu(mainMenu: string, subMenu: string) {
        const el = this.page.getByRole('heading', { name: mainMenu });
        await el.scrollIntoViewIfNeeded();
        await el.click();

        const accordion = this.page.locator('[class="accordion"]').getByText(subMenu, { exact: true });
        await accordion.scrollIntoViewIfNeeded()
        await accordion.click()

        await expect(this.page.locator('h1', { hasText: subMenu })).toBeVisible();
    }
}