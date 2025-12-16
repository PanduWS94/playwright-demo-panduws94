import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const mainMenu = 'Forms';

// const menus = [
//     { subMenu: 'Practice Form' },
// ];

// menus.forEach(({ subMenu }) => {
//     test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
//         await page.goto('https://demoqa.com');
//         const home = new HomePage(page);
//         await home.goToMenu(mainMenu, subMenu);
//     });
// });

test(`user input in Practice Form`, async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Practice Form');

    await page.locator('[id="firstName"]').fill('Pandu');
    await page.locator('[id="lastName"]').fill('Wibisono');
    await page.locator('[id="userEmail"]').fill('testing@gmail.com');

    await page.getByText('Male', { exact: true }).click();
    await page.locator('[id="userNumber"]').fill('087823423423');

    await page.locator('[id="dateOfBirthInput"]').click();
    await page.locator('.react-datepicker__month-select').selectOption('5');
    await page.locator('.react-datepicker__year-select').selectOption('1990');
    await page.locator('.react-datepicker__day--015').click();
    await page.locator('[id="subjectsInput"]').fill('Maths');
    await page.locator('[id="subjectsInput"]').press('Enter');
    await page.getByText('Sports').click();
    await page.locator('[id="uploadPicture"]').setInputFiles('e2e/assets/ProfilPhoto.jpg');
    await page.locator('[id="currentAddress"]').fill('Jl. Merdeka No. 123 Jakarta');
    await page.locator('#state').click();
    await page.getByText('NCR', { exact: true }).click();
    await page.locator('#city').click();
    await page.getByText('Delhi', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('[class="modal-content"]')).toBeVisible();
    await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click({ force: true });
    await expect(page.locator('h1', { hasText: 'Practice Form' })).toBeVisible();

});