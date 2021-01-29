describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=Todolist-additemform--add-item-form-example&viewMode=story');
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('editableSpan', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=Todolist-editablespan--editable-span-example&viewMode=story');
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('taskIsDone', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=Todolist-task--task-is-done-example&viewMode=story');
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});

describe('AppWithRedux', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?id=Todolist-appwithredux--app-with-redux-example&viewMode=story');
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
