const { test, expect } = require('@playwright/test');

test('Check add book page', async ({ page }) => {
    await page.goto('https://mdzhut200-retake-exam-test.onrender.com/add-book');
    const form = await page.$('form');
    expect(form).toBeTruthy();
  });
  