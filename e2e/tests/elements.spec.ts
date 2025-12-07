import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const menus = [
  { subMenu: 'Text Box' },
  { subMenu: 'Check Box' },
  { subMenu: 'Radio Button' },
  { subMenu: 'Web Tables' },
  { subMenu: 'Buttons' },
  { subMenu: 'Links' },
  { subMenu: 'Broken Links - Images' },
  { subMenu: 'Upload and Download' },
  { subMenu: 'Dynamic Properties' },
];

menus.forEach(({ subMenu }) => {
  test(`access to menu and submenu ${subMenu}`, async ({ page }) => {
    await page.goto('https://demoqa.com');

    const home = new HomePage(page);

    await home.goToMenu(subMenu);   // hanya 1 fungsi untuk semua menu
  });
});
