import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const mainMenu = 'Alerts, Frame & Windows';

const menus = [
    { subMenu: 'Browser Windows' },
    { subMenu: 'Alerts' },
    { subMenu: 'Frames' },
    { subMenu: 'Nested Frames' },
    { subMenu: 'Modal Dialogs' },
];

menus.forEach(({ subMenu }) => {
    test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
        await page.goto('https://demoqa.com');
        const home = new HomePage(page);
        await home.goToMenu(mainMenu, subMenu);
    });
});

test(`user handle browser windows`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Browser Windows');

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: 'New Tab' }).click(),
    ]);
    await expect(newPage).toHaveURL('https://demoqa.com/sample');
    await expect(newPage.locator('h1', { hasText: 'This is a sample page' })).toBeVisible();

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: 'New Window', exact: true }).click(),
    ]);
    await expect(newWindow).toHaveURL('https://demoqa.com/sample');
    await expect(newWindow.locator('h1', { hasText: 'This is a sample page' })).toBeVisible();

    const [newWindowMessage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: 'New Window Message' }).click(),
    ]);
    await expect(newWindowMessage).toHaveURL('https://demoqa.com/browser-windows');
    await expect(newWindowMessage.locator('body')).toHaveText('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
});

test(`user handle alerts`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Alerts');

    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('You clicked a button');
        await dialog.accept();
    });
    await page.locator('#alertButton').click();
    page.removeAllListeners('dialog');


    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('This alert appeared after 5 seconds');
        await dialog.accept();
    });
    await page.locator('#timerAlertButton').click();
    await page.waitForTimeout(6000);
    page.removeAllListeners('dialog');


    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Do you confirm action?');
        await dialog.accept();
    });
    await page.locator('#confirmButton').click();
    await expect(page.locator('#confirmResult')).toHaveText('You selected Ok');
    page.removeAllListeners('dialog');


    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe('Please enter your name');
        await dialog.accept('Pandu Wibisono');
    });
    await page.locator('#promtButton').click();
    await expect(page.locator('#promptResult')).toHaveText('You entered Pandu Wibisono');
    page.removeAllListeners('dialog');


});