import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const mainMenu = 'Widgets';

const menus = [
    { subMenu: 'Accordian' },
    { subMenu: 'Auto Complete' },
    { subMenu: 'Date Picker' },
    { subMenu: 'Slider' },
    { subMenu: 'Progress Bar' },
    { subMenu: 'Tabs' },
    { subMenu: 'Tool Tips' },
    { subMenu: 'Menu' },
    { subMenu: 'Select Menu' },
];

menus.forEach(({ subMenu }) => {
    test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
        await page.goto('https://demoqa.com');
        const home = new HomePage(page);
        await home.goToMenu(mainMenu, subMenu);
    });
});