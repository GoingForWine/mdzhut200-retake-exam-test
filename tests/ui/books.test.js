const { test, expect } = require('@playwright/test');

test('Check books page', async ({ page }) => {
    await page.goto('https://mdzhut200-retake-exam-test.onrender.com/books');
    const list = await page.$('ul');
    expect(list).toBeTruthy();
  });
  