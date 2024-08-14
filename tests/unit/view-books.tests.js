const assert = require('assert');
const fetch = require('node-fetch');

suite('View Books page', function() {
  test('Page title', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/books");
    let body = await res.text();
    assert.ok(body.includes("<h1>Added Books</h1>"));
  });
  
  test('Books list', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/books");
    let body = await res.text();
    // console.log('Response body:', body); // Print the actual response to debug

    // Define the expected book titles and authors
    const expectedBooks = [
        "A Song of Ice and Fire (George R. R. Martin)",
        "Shogun (James Clavell)",
        "To Kill a Mockingbird (Harper Lee)"
    ];

    // Check that each expected book is included in the response
    expectedBooks.forEach(book => {
        assert.ok(body.includes(book), `The book "${book}" is not found in the list`);
    });
});


});
