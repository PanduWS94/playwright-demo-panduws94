import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

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

test('user handle accordian widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Accordian');

    const firstSection = page.locator('#section1Heading');
    await firstSection.click();
    await expect(page.locator('#section1Content')).toBeVisible();

    const secondSection = page.locator('#section2Heading');
    await secondSection.click();
    await expect(page.locator('#section2Content')).toBeVisible();

    const thirdSection = page.locator('#section3Heading');
    await thirdSection.click();
    await expect(page.locator('#section3Content')).toBeVisible();
});

test('user handle auto complete widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Auto Complete');

    const multiInput = page.locator('#autoCompleteMultipleInput');
    await multiInput.fill('r');
    await page.locator('.auto-complete__option').first().click();
    await multiInput.fill('g');
    await page.locator('.auto-complete__option').first().click();
    const value = await page.locator('#autoCompleteMultipleContainer .auto-complete__multi-value').allTextContents();
    expect(value).toEqual(expect.arrayContaining(['Red', 'Green']));
});

test('user handle date picker widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Date Picker');

    const dateInput = page.locator('#datePickerMonthYearInput');
    await dateInput.fill('05/15/2023');
    await dateInput.press('Enter');
    await expect(dateInput).toHaveValue('05/15/2023');

    const dateAndTimeInput = page.locator('#dateAndTimePickerInput');
    await dateAndTimeInput.click();
    await dateAndTimeInput.fill('June 15, 2023 02:30 PM');
    await dateAndTimeInput.press('Enter');
    await expect(dateAndTimeInput).toHaveValue('June 15, 2023 2:30 PM');
});

test('user handle slider widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Slider');

    const slider = page.locator('.range-slider');
    await slider.fill('75');
    await expect(page.locator('#sliderValue')).toHaveValue('75');
});

test('user handle progress bar widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Progress Bar');

    const startStopButton = page.locator('#startStopButton');
    const progressBar = page.locator('.progress-bar');
    await startStopButton.click();
    await page.waitForTimeout(3000);
    await startStopButton.click();
    const progressValue = await progressBar.getAttribute('aria-valuenow');
    expect(Number(progressValue)).toBeGreaterThan(30);
    expect(Number(progressValue)).toBeLessThan(32);
});

test('user handle tabs widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Tabs');

    const whatTab = page.locator('#demo-tab-what');
    await whatTab.click();
    await expect(page.locator('#demo-tabpane-what')).toBeVisible();

    const originTab = page.locator('#demo-tab-origin');
    await originTab.click();
    await expect(page.locator('#demo-tabpane-origin')).toBeVisible();

    const useTab = page.locator('#demo-tab-use');
    await useTab.click();
    await expect(page.locator('#demo-tabpane-use')).toBeVisible();
});

test('user handle tool tips widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Tool Tips');

    const button = page.locator('#toolTipButton');
    await button.hover();
    await expect(page.locator('.tooltip-inner', { hasText: 'You hovered over the Button' })).toBeVisible();

    const textField = page.locator('#toolTipTextField');
    await textField.click();
    await textField.hover();
    await expect(page.locator('.tooltip-inner', { hasText: 'You hovered over the text field' })).toBeVisible();

    const contraryLink = page.locator('a[href="javascript:void(0)"]', { hasText: 'Contrary' });
    await contraryLink.hover();
    await expect(page.locator('.tooltip-inner', { hasText: 'You hovered over the Contrary' })).toBeVisible();

    const numberLink = page.locator('a[href="javascript:void(0)"]', { hasText: '1.10.32' });
    await numberLink.hover();
    await expect(page.locator('.tooltip-inner', { hasText: 'You hovered over the 1.10.32' })).toBeVisible();
});

test('user handle menu widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Menu');

    const mainItem2 = page.locator('text=Main Item 2');
    await mainItem2.hover();
    await page.waitForTimeout(1000);
    await expect(page.locator('text=SUB SUB LIST »')).toBeVisible();

    const subItem = page.locator('text=SUB SUB LIST »');
    await subItem.hover();
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Sub Sub Item 1')).toBeVisible();
});

test('user handle select menu widget', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Select Menu');

    const selectValue = page.locator('#react-select-2-input');
    await selectValue.fill('group 2, option 1');
    await page.keyboard.press('Enter');
    await expect(page.locator('#withOptGroup > div > div.css-1hwfws3 > div.css-1uccc91-singleValue')).toHaveText('Group 2, option 1');

    const selectOne = page.locator('#react-select-3-input');
    await selectOne.fill('mrs.');
    await page.keyboard.press('Enter');
    await expect(page.locator('#selectOne > div > div.css-1hwfws3 > div.css-1uccc91-singleValue')).toHaveText('Mrs.');

    const oldStyleSelect = page.locator('#oldSelectMenu');
    await oldStyleSelect.selectOption('Purple');
    await expect(oldStyleSelect).toHaveValue('4');

    const multiSelect = page.locator('#react-select-4-input');

    await multiSelect.fill('Red');
    await page.keyboard.press('Enter');
    await multiSelect.fill('Blue');
    await page.keyboard.press('Enter');
    await multiSelect.fill('Green');
    await page.keyboard.press('Enter');

    const standartMultiSelect = page.locator('#cars');
    await standartMultiSelect.selectOption(['volvo', 'audi']);
});