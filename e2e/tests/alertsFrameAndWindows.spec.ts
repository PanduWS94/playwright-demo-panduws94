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