import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const mainMenu = 'Elements';

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
  test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, subMenu);
  });
});

test(`user input in Text Box`, async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Text Box');

  await page.locator('[id="userName"]').fill('John Doe');
  await page.locator('[id="userEmail"]').fill('testingpandu@gmail.com');
  await page.locator('[id="currentAddress"]').fill('123 Main St, Anytown, USA');
  await page.locator('[id="permanentAddress"]').fill('456 Elm St, Othertown, USA');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('[class="border col-md-12 col-sm-12"]')).toBeVisible();
});

test(`user check in the box`, async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Check Box');

  await page.locator('[title="Expand all"]').click();
  await page.getByText('Commands').click();
  await page.getByText('Veu').click();
  await page.getByText('General').click();
  await page.getByText('Excel File.doc').click();

  const items = [
    'Desktop',
    'Documents',
    'Office',
    'Downloads',
  ];

  for (const item of items) {
    await expect(
      page.locator('label', { hasText: item }).locator('[class="rct-icon rct-icon-half-check"]')
    ).toBeVisible();
  }
  await expect(page.locator('[id="result"]')).toBeVisible();
  await expect(page.locator('#result')).toHaveText([
    'You have selected :commandsveugeneralexcelFile',
  ]);
});

test(`user input radio button`, async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Radio Button');

  await page.locator('[id="impressiveRadio"]').click({ force: true });
  await expect(page.getByText('You have selected Impressive')).toBeVisible();
});

test(`user doing CRUD web tables`, async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Web Tables');

  await page.locator('[id="addNewRecordButton"]').click({ force: true });
  await page.locator('[id="firstName"]').fill('Pandu');
  await page.locator('[id="lastName"]').fill('Wibisono');
  await page.locator('[id="userEmail"]').fill('testingpandu@gmail.com');
  await page.locator('[id="age"]').fill('30');
  await page.locator('[id="salary"]').fill('50000');
  await page.locator('[id="department"]').fill('Engineering');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('[role="rowgroup"]').filter({ hasText: 'PanduWibisono30testingpandu@' })).toBeVisible();

  const row = page.locator('[role="rowgroup"]', {
    hasText: 'Pandu'
  });
  await row.locator('span[title="Edit"]').click();
  await page.locator('[id="salary"]').fill('1000000');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('[role="rowgroup"]').filter({ hasText: '1000000' })).toBeVisible();

  await row.locator('span[title="Delete"]').click();
  await expect(page.locator('[role="rowgroup"]').filter({ hasText: 'Pandu' })).not.toBeVisible();

});
