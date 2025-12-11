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

test(`user handle frames`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Frames');

    const frame1 = page.frameLocator('iframe[width="500px"][height="350px"]');
    await expect(frame1.getByText('This is a sample page')).toBeVisible();

    const frame2 = page.frameLocator('iframe[width="100px"][height="100px"]');
    await expect(frame2.getByText('This is a sample page')).toBeVisible();
});

test(`user handle nested frames`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Nested Frames');

    const parentFrame = page.frameLocator('#frame1');
    await expect(parentFrame.getByText('Parent frame')).toBeVisible();

    const childFrame = parentFrame.frameLocator('iframe');
    await expect(childFrame.getByText('Child Iframe')).toBeVisible();
});

test(`user handle modal dialogs`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Modal Dialogs');

    await page.locator('#showSmallModal').click();
    await expect(page.locator('#example-modal-sizes-title-sm')).toHaveText('Small Modal');
    await expect(page.locator('.modal-body')).toHaveText('This is a small modal. It has very less content');
    await page.locator('#closeSmallModal').click();
    await expect(page.locator('#example-modal-sizes-title-sm')).toBeHidden();

    await page.locator('#showLargeModal').click();
    await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Large Modal');
    await expect(page.locator('.modal-body')).toContainText('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
    await page.locator('#closeLargeModal').click();
    await expect(page.locator('#example-modal-sizes-title-lg')).toBeHidden();
});