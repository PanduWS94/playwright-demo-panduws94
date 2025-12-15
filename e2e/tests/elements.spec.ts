import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import path from 'path';

const mainMenu = 'Elements';

// const menus = [
//   { subMenu: 'Text Box' },
//   { subMenu: 'Check Box' },
//   { subMenu: 'Radio Button' },
//   { subMenu: 'Web Tables' },
//   { subMenu: 'Buttons' },
//   { subMenu: 'Links' },
//   { subMenu: 'Broken Links - Images' },
//   { subMenu: 'Upload and Download' },
//   { subMenu: 'Dynamic Properties' },
// ];

// menus.forEach(({ subMenu }) => {
//   test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
//     await page.goto('https://demoqa.com');
//     const home = new HomePage(page);
//     await home.goToMenu(mainMenu, subMenu);
//   });
// });

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

test('user click button actions', async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Buttons');

  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click')
  await page.getByRole('button', { name: 'Right Click Me' }).click({ button: 'right' });
  await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click')
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click')
});

test('user click links', async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Links');

  await page.getByRole('link', { name: 'Created' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 201 and status text Created');

  await page.getByRole('link', { name: 'No Content' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 204 and status text No Content');

  await page.getByRole('link', { name: 'Moved' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 301 and status text Moved Permanently');

  await page.getByRole('link', { name: 'Bad Request' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 400 and status text Bad Request');

  await page.getByRole('link', { name: 'Unauthorized' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 401 and status text Unauthorized');

  await page.getByRole('link', { name: 'Forbidden' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 403 and status text Forbidden');

  await page.getByRole('link', { name: 'Not Found' }).click();
  await expect(page.locator('#linkResponse')).toHaveText('Link has responded with staus 404 and status text Not Found');

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('link', { name: 'Home', exact: true }).click()
  ]);
  await newPage.waitForTimeout(10000);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://demoqa.com/');
});

test('user check broken links and images', async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Broken Links - Images');

  // valid image
  const validImage = page.locator('img[src="/images/Toolsqa.jpg"]').nth(1);
  await expect(validImage).toBeVisible();
  const width = await validImage.evaluate(el => (el as HTMLImageElement).naturalWidth);
  expect(width).toBeGreaterThan(0);


  // broken image
  const brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
  await expect(brokenImage).toBeVisible();
  expect(width).toBe(347); // assuming the broken image has a width of 347 pixels

  // valid link
  await page.getByRole('link', { name: 'Click Here for Valid Link' }).click()
  await expect(page).toHaveURL('https://demoqa.com/');
  await page.goBack();

  // broken link
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();
  await expect(page).toHaveURL('http://the-internet.herokuapp.com/status_codes/500');
});

test('user upload and download file', async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Upload and Download');

  // download file
  const downloadPromise = page.waitForEvent('download');
  page.locator('[id="downloadButton"]').click()

  const download = await downloadPromise;
  const savePath = path.resolve(__dirname, '../../e2e/downloads', download.suggestedFilename());
  await download.saveAs(savePath);

  console.log("Saved at:", savePath);

  const savedPath = savePath;
  expect(savedPath).toContain('sampleFile.jpeg');

  // delete file after download
  const fs = require('fs');
  fs.unlinkSync(savedPath);

  // upload file
  await page.locator('input[type="file"]').setInputFiles('e2e/assets/ProfilPhoto.jpg');
  await expect(page.locator('#uploadedFilePath')).toHaveText('C:\\fakepath\\ProfilPhoto.jpg');
});

test('user check dynamic properties', async ({ page }) => {
  await page.goto('https://demoqa.com');
  const home = new HomePage(page);
  await home.goToMenu(mainMenu, 'Dynamic Properties');

  // check enable button after 5 seconds, color change and visible button
  const enableButton = page.locator('[id="enableAfter"]');
  await expect(enableButton).toBeDisabled();
  const colorChangeButton = page.locator('[id="colorChange"]');
  const initialClass = await colorChangeButton.getAttribute('class');
  const visibleButton = page.locator('[id="visibleAfter"]');
  await expect(visibleButton).toBeHidden();

  await page.waitForTimeout(6000);

  await expect(enableButton).toBeEnabled();
  const changedClass = await colorChangeButton.getAttribute('class');
  expect(initialClass).not.toBe(changedClass);
  await expect(visibleButton).toBeVisible();
});