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

test('user handle sortable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Sortable');

    const itemOne = page.locator('#demo-tabpane-list > div > div:nth-child(1)');
    const itemFive = page.locator('#demo-tabpane-list > div > div:nth-child(5)');
    const boxOne = await itemOne.boundingBox();
    const boxFive = await itemFive.boundingBox();
    if (boxOne && boxFive) {
        await itemOne.hover();
        await page.mouse.down();
        await page.mouse.move(boxFive.x + boxFive.width / 2, boxFive.y + boxFive.height / 2);
        await page.mouse.up();
    }
    await expect(page.locator('#demo-tabpane-list > div > div:nth-child(4)')).toHaveText('Five');

    const gridTab = page.locator('#demo-tab-grid');
    await gridTab.click();

    const gridItemOne = page.locator('#demo-tabpane-grid > div > div > div:nth-child(1)');
    const gridItemSix = page.locator('#demo-tabpane-grid > div > div > div:nth-child(6)');
    const boxGridOne = await gridItemOne.boundingBox();
    const boxGridSix = await gridItemSix.boundingBox();
    if (boxGridOne && boxGridSix) {
        await gridItemOne.hover();
        await page.mouse.down();
        await page.mouse.move(boxGridSix.x + boxGridSix.width / 2, boxGridSix.y + boxGridSix.height / 2);
        await page.mouse.up();
    }
    await expect(page.locator('#demo-tabpane-grid > div > div > div:nth-child(5)')).toHaveText('Six');
});

test('user handle selectable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Selectable');

    const itemThree = page.locator('#verticalListContainer > li:nth-child(3)');
    await itemThree.click();
    await expect(itemThree).toHaveClass(/active/);
});

test('user handle resizable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Resizable');

    const resizableBox = page.locator('#resizableBoxWithRestriction');
    const handle = resizableBox.locator('.react-resizable-handle');
    const boxBefore = await resizableBox.boundingBox();
    if (boxBefore) {
        await handle.hover();
        await page.mouse.down();
        await page.mouse.move(boxBefore.x + boxBefore.width + 50, boxBefore.y + boxBefore.height + 50);
        await page.mouse.up();
    }
    const boxAfter = await resizableBox.boundingBox();
    if (!boxAfter) throw new Error('boxAfter is null');
    if (!boxBefore) throw new Error('boxBefore is null');

    expect(boxAfter.width).toBeGreaterThan(boxBefore.width);
    expect(boxAfter.height).toBeGreaterThan(boxBefore.height);

    const resizable = page.locator('#resizable');
    const handle2 = resizable.locator('.react-resizable-handle');
    const box2Before = await resizable.boundingBox();
    if (box2Before) {
        await handle2.hover();
        await page.mouse.down();
        await page.mouse.move(box2Before.x + box2Before.width + 50, box2Before.y + box2Before.height + 50);
        await page.mouse.up();
    }
    const box2After = await resizable.boundingBox();
    if (!box2After) throw new Error('boxAfter is null');
    if (!box2Before) throw new Error('boxBefore is null');

    expect(box2After.width).toBeGreaterThan(box2Before.width);
    expect(box2After.height).toBeGreaterThan(box2Before.height);
});

test('user handle droppable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Droppable');

    // const dragBox = page.locator('#draggable');
    // const dropBox = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
    // const boxDrop = await dropBox.boundingBox();
    // if (boxDrop) {
    //     await dragBox.hover();
    //     await page.mouse.down();
    //     await page.mouse.move(boxDrop.x + boxDrop.width / 2, boxDrop.y + boxDrop.height / 2);
    //     await page.mouse.up();
    // }
    // await expect(dropBox.locator('p')).toHaveText('Dropped!');

    // const tabAccept = page.locator('#droppableExample-tab-accept');
    // await tabAccept.click();


    // const acceptable = page.locator('#acceptable');
    // const notAcceptable = page.locator('#notAcceptable');
    // const dropBox2 = page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable');
    // const boxDrop2 = await dropBox2.boundingBox();
    // if (boxDrop2) {
    //     await notAcceptable.hover();
    //     await page.mouse.down();
    //     await page.mouse.move(boxDrop2.x + boxDrop2.width / 2, boxDrop2.y + boxDrop2.height / 2);
    //     await page.mouse.up();
    // }
    // await expect(dropBox2.locator('p')).toHaveText('Drop here');

    // const boxDrop3 = await dropBox2.boundingBox();
    // if (boxDrop3) {
    //     await acceptable.hover();
    //     await page.mouse.down();
    //     await page.mouse.move(boxDrop3.x + boxDrop3.width / 2, boxDrop3.y + boxDrop3.height / 2);
    //     await page.mouse.up();
    // }
    // await expect(dropBox2.locator('p')).toHaveText('Dropped!');

    const tabPreventPropagation = page.locator('#droppableExample-tab-preventPropogation');
    await tabPreventPropagation.click();

    const dragBox3 = page.locator('#dragBox');
    const dropBoxParent = page.locator('#notGreedyDropBox');
    const dropBoxChild = dropBoxParent.locator('#notGreedyInnerDropBox');
    const boxDropParent = await dropBoxParent.boundingBox();
    if (boxDropParent) {
        await dragBox3.hover();
        await page.mouse.down();
        await page.mouse.move(boxDropParent.x + boxDropParent.width / 2, boxDropParent.y + boxDropParent.height / 2);
        await page.mouse.up();
    }
    await expect(dropBoxParent.locator('p')).toHaveText('Dropped!');
    await expect(dropBoxChild.locator('p')).toHaveText('Drop here');
});

test('user handle draggable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Dragabble');

    // const dragBox = page.locator('#dragBox');
    // const boxBefore = await dragBox.boundingBox();
    // if (boxBefore) {
    //     await dragBox.hover();
    //     await page.mouse.down();
    //     await page.mouse.move(boxBefore.x + 100, boxBefore.y + 100);
    //     await page.mouse.up();
    // }
    // const boxAfter = await dragBox.boundingBox();
    // expect(boxAfter.x).toBeGreaterThan(boxBefore.x);
    // expect(boxAfter.y).toBeGreaterThan(boxBefore.y);
});