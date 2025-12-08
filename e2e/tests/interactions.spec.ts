import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const mainMenu = 'Interactions';

const menus = [
    { subMenu: 'Sortable' },
    { subMenu: 'Selectable' },
    { subMenu: 'Resizable' },
    { subMenu: 'Droppable' },
    { subMenu: 'Dragabble' },
];

menus.forEach(({ subMenu }) => {
    test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
        await page.goto('https://demoqa.com');
        const home = new HomePage(page);
        await home.goToMenu(mainMenu, subMenu);
    });
});