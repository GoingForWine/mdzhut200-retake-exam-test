const assert = require('assert');
const fetch = require('node-fetch');

suite('Home page', function() {
  test('Page title', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/");
    let body = await res.text();
    assert.ok(body.includes("<h1>Books Collection</h1>"));
  });
  
  test('Books count', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/");
    let body = await res.text();
    assert.ok(body.includes("Added books: <b>4</b>"));
  });
});
