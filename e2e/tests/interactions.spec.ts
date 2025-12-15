import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const mainMenu = 'Interactions';

// const menus = [
//     { subMenu: 'Sortable' },
//     { subMenu: 'Selectable' },
//     { subMenu: 'Resizable' },
//     { subMenu: 'Droppable' },
//     { subMenu: 'Dragabble' },
// ];

// menus.forEach(({ subMenu }) => {
//     test(`access to menu ${mainMenu} and submenu ${subMenu}`, async ({ page }) => {
//         await page.goto('https://demoqa.com');
//         const home = new HomePage(page);
//         await home.goToMenu(mainMenu, subMenu);
//     });
// });

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

    const dragBox = page.locator('#draggable');
    const dropBox = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
    const boxDrop = await dropBox.boundingBox();
    if (boxDrop) {
        await dragBox.hover();
        await page.mouse.down();
        await page.mouse.move(boxDrop.x + boxDrop.width / 2, boxDrop.y + boxDrop.height / 2);
        await page.mouse.up();
    }
    await expect(dropBox.locator('p')).toHaveText('Dropped!');


    const tabAccept = page.locator('#droppableExample-tab-accept');
    await tabAccept.click();

    const acceptable = page.locator('#acceptable');
    const notAcceptable = page.locator('#notAcceptable');
    const dropBox2 = page.getByRole('tabpanel', { name: 'Accept' }).locator('#droppable');
    const boxDrop2 = await dropBox2.boundingBox();
    if (boxDrop2) {
        await notAcceptable.hover();
        await page.mouse.down();
        await page.mouse.move(boxDrop2.x + boxDrop2.width / 2, boxDrop2.y + boxDrop2.height / 2);
        await page.mouse.up();
    }
    await expect(dropBox2.locator('p')).toHaveText('Drop here');

    const boxDrop3 = await dropBox2.boundingBox();
    if (boxDrop3) {
        await acceptable.hover();
        await page.mouse.down();
        await page.mouse.move(boxDrop3.x + boxDrop3.width / 2, boxDrop3.y + boxDrop3.height / 2);
        await page.mouse.up();
    }
    await expect(dropBox2.locator('p')).toHaveText('Dropped!');


    const tabPreventPropagation = page.locator('#droppableExample-tab-preventPropogation');
    await tabPreventPropagation.click();

    const dragBox3 = page.locator('#dragBox');

    const dropBoxParent = page.locator('#notGreedyDropBox');
    const dropBoxChild = dropBoxParent.locator('#notGreedyInnerDropBox');

    const boxDropChild = await dropBoxChild.getByText('Inner droppable').boundingBox();
    if (boxDropChild) {
        await dragBox3.hover();
        await page.mouse.down();
        await page.mouse.move(boxDropChild.x + boxDropChild.width / 2, boxDropChild.y + boxDropChild.height / 2);
        await page.mouse.up();
    }
    await expect(dropBoxParent.locator('p').first()).toHaveText('Dropped!');
    await expect(dropBoxChild.locator('p').first()).toHaveText('Dropped!');

    const dropBoxParent1 = page.locator('#greedyDropBox');
    const dropBoxChild1 = dropBoxParent1.locator('#greedyDropBoxInner');

    const boxDropChild1 = await dropBoxChild1.getByText('Inner droppable').boundingBox();
    if (boxDropChild1) {
        await dragBox3.hover();
        await page.mouse.down();
        await page.mouse.move(boxDropChild1.x + boxDropChild1.width / 2, boxDropChild1.y + boxDropChild1.height / 2);
        await page.mouse.up();
    }
    await expect(dropBoxParent1.locator('p').first()).toHaveText('Outer droppable');
    await expect(dropBoxChild1.locator('p').first()).toHaveText('Dropped!');


    const tabRevertDraggable = page.locator('#droppableExample-tab-revertable');
    await tabRevertDraggable.click();

    const willRevert = page.locator('#revertable');
    const wontRevert = page.locator('#notRevertable');
    const dropBox3 = page.getByRole('tabpanel', { name: 'Revert Draggable' }).locator('#droppable');
    const boxDrop4 = await dropBox3.boundingBox();
    if (boxDrop4) {
        await willRevert.hover();
        await page.mouse.down();
        await page.mouse.move(boxDrop4.x + boxDrop4.width / 2, boxDrop4.y + boxDrop4.height / 2);
        await page.mouse.up();
    }
    await expect(dropBox3.locator('p')).toHaveText('Dropped!');
    await expect(willRevert).toHaveAttribute('style', 'position: relative; left: 0px; top: 0px;');

    const boxDrop5 = await dropBox3.boundingBox();
    if (boxDrop5) {
        await wontRevert.hover();
        await page.mouse.down();
        await page.mouse.move(boxDrop5.x + boxDrop5.width / 2, boxDrop5.y + boxDrop5.height / 2);
        await page.mouse.up();
    }
    await expect(dropBox3.locator('p')).toHaveText('Dropped!');
    await expect(wontRevert).not.toHaveAttribute('style', 'position: relative; left: 0px; top: 0px;');
});

test('user handle draggable interaction', async ({ page }) => {
    await page.goto('https://demoqa.com');
    const home = new HomePage(page);
    await home.goToMenu(mainMenu, 'Dragabble');

    const dragBox = page.locator('#dragBox');
    const dropBox = page.getByRole('tabpanel', { name: 'Simple' });
    const boxBefore = await dropBox.boundingBox();
    if (boxBefore) {
        await dragBox.hover();
        await page.mouse.down();
        await page.mouse.move(boxBefore.x + 100, boxBefore.y + 100);
        await page.mouse.up();
    }
    const boxAfter = await dragBox.boundingBox();
    if (!boxAfter) throw new Error('boxAfter is null');
    if (!boxBefore) throw new Error('boxBefore is null');
    expect(boxAfter.x).toBeGreaterThan(boxBefore.x);
    expect(boxAfter.y).toBeGreaterThan(boxBefore.y);


    const tabAxisRestricted = page.locator('#draggableExample-tab-axisRestriction');
    await tabAxisRestricted.click();

    const dragBoxX = page.locator('#restrictedX');
    const boxXBefore = await dragBoxX.boundingBox();
    if (boxXBefore) {
        await dragBoxX.hover();
        await page.mouse.down();
        await page.mouse.move(boxXBefore.x + 100, boxXBefore.y + 100);
        await page.mouse.up();
    }
    const boxXAfter = await dragBoxX.boundingBox();
    if (!boxXAfter) throw new Error('boxXAfter is null');
    if (!boxXBefore) throw new Error('boxXBefore is null');
    expect(boxXAfter.x).toBeGreaterThan(boxXBefore.x);
    expect(boxXAfter.y).toBe(boxXBefore.y);

    const dragBoxY = page.locator('#restrictedY');
    const boxYBefore = await dragBoxY.boundingBox();
    if (boxYBefore) {
        await dragBoxY.hover();
        await page.mouse.down();
        await page.mouse.move(boxYBefore.x + 100, boxYBefore.y + 100);
        await page.mouse.up();
    }
    const boxYAfter = await dragBoxY.boundingBox();
    if (!boxYAfter) throw new Error('boxYAfter is null');
    if (!boxYBefore) throw new Error('boxYBefore is null');
    expect(boxYAfter.x).toBe(boxYBefore.x);
    expect(boxYAfter.y).toBeGreaterThan(boxYBefore.y);


    const tabContainerRestricted = page.locator('#draggableExample-tab-containerRestriction');
    await tabContainerRestricted.click();

    const dragBoxContainer = page.locator('#containmentWrapper').getByText(`I'm contained within the box`);
    const boxContainerBefore = await dragBoxContainer.boundingBox();
    const container = page.locator('#containmentWrapper');
    const containerBox = await container.boundingBox();
    if (boxContainerBefore && containerBox) {
        await dragBoxContainer.hover();
        await page.mouse.down();
        await page.mouse.move(containerBox.x + containerBox.width + 50, containerBox.y + containerBox.height + 50);
        await page.mouse.up();
    }
    const boxContainerAfter = await dragBoxContainer.boundingBox();
    if (!boxContainerAfter) throw new Error('boxContainerAfter is null');
    if (!boxContainerBefore) throw new Error('boxContainerBefore is null');
    if (!containerBox) throw new Error('containerBox is null');
    expect(boxContainerAfter.x + boxContainerAfter.width).toBeLessThan(containerBox.x + containerBox.width);
    expect(boxContainerAfter.y + boxContainerAfter.height).toBeLessThan(containerBox.y + containerBox.height);

    const dragBoxContainerParent = page.locator('[class="draggable ui-widget-content m-3"]').getByText(`I'm contained within my parent`)
    const boxContainerParentBefore = await dragBoxContainerParent.boundingBox();
    const containerParent = page.locator('[class="draggable ui-widget-content m-3"]');
    const containerParentBox = await containerParent.boundingBox();
    if (boxContainerParentBefore && containerParentBox) {
        await dragBoxContainerParent.hover();
        await page.mouse.down();
        await page.mouse.move(containerParentBox.x + containerParentBox.width + 50, containerParentBox.y + containerParentBox.height + 50);
        await page.mouse.up();
    }
    const boxContainerParentAfter = await dragBoxContainerParent.boundingBox();
    if (!boxContainerParentAfter) throw new Error('boxContainerParentAfter is null');
    if (!boxContainerParentBefore) throw new Error('boxContainerParentBefore is null');
    if (!containerParentBox) throw new Error('containerBox is null');
    expect(boxContainerParentAfter.x + boxContainerParentAfter.width).toBeLessThan(containerParentBox.x + containerParentBox.width);
    expect(boxContainerParentAfter.y + boxContainerParentAfter.height).toBeLessThan(containerParentBox.y + containerParentBox.height);


    const tabCursorStyle = page.locator('#draggableExample-tab-cursorStyle');
    await tabCursorStyle.click();

    const dragBoxCursorCentre = page.locator('#cursorCenter');
    const boxCursorCentreBefore = await dragBoxCursorCentre.boundingBox();
    if (boxCursorCentreBefore) {
        await dragBoxCursorCentre.hover();
        await page.mouse.down();
        await page.mouse.move(boxCursorCentreBefore.x + 100, boxCursorCentreBefore.y + 100);
        await page.mouse.up();
    }
    const boxCursorCentreAfter = await dragBoxCursorCentre.boundingBox();
    if (!boxCursorCentreAfter) throw new Error('boxCursorCentreAfter is null');
    if (!boxCursorCentreBefore) throw new Error('boxCursorCentreBefore is null');
    expect(boxCursorCentreAfter.x).toBeGreaterThan(boxCursorCentreBefore.x);
    expect(boxCursorCentreAfter.y).toBeGreaterThan(boxCursorCentreBefore.y);

    const dragBoxCursorTopLeft = page.locator('#cursorTopLeft');
    const boxCursorTopLeftBefore = await dragBoxCursorTopLeft.boundingBox();
    if (boxCursorTopLeftBefore) {
        await dragBoxCursorTopLeft.hover();
        await page.mouse.down();
        await page.mouse.move(boxCursorTopLeftBefore.x + 100, boxCursorTopLeftBefore.y + 100);
        await page.mouse.up();
    }
    const boxCursorTopLeftAfter = await dragBoxCursorCentre.boundingBox();
    if (!boxCursorTopLeftAfter) throw new Error('boxCursorTopLeftAfter is null');
    if (!boxCursorTopLeftBefore) throw new Error('boxCursorTopLeftBefore is null');
    expect(boxCursorTopLeftAfter.x).toBeGreaterThan(boxCursorTopLeftBefore.x);
    expect(boxCursorTopLeftAfter.y).toBeLessThan(boxCursorTopLeftBefore.y);

    const dragBoxCursorBottom = page.locator('#cursorBottom');
    const boxCursorBottomBefore = await dragBoxCursorBottom.boundingBox();
    if (boxCursorBottomBefore) {
        await dragBoxCursorBottom.hover();
        await page.mouse.down();
        await page.mouse.move(boxCursorBottomBefore.x + 100, boxCursorBottomBefore.y + 100);
        await page.mouse.up();
    }
    const boxCursorBottomAfter = await dragBoxCursorBottom.boundingBox();
    if (!boxCursorBottomAfter) throw new Error('boxCursorBottomAfter is null');
    if (!boxCursorBottomBefore) throw new Error('boxCursorBottomBefore is null');
    expect(boxCursorBottomAfter.x).toBeGreaterThan(boxCursorBottomBefore.x);
    expect(boxCursorBottomAfter.y).toBe(boxCursorBottomBefore.y);
});