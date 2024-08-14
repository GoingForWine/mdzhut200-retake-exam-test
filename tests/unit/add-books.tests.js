const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Books page', function() {
  test('Page title', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/add-book");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Book</h1>"));
  });

  test('Book HTML form', async function() {
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/add-book");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let authorFieldFound = body.includes('<input id="author" type="text" name="author"/>');
    assert.ok(authorFieldFound, "Field 'author' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid book', async function() {
    let res = await fetch(
      "https://mdzhut200-retake-exam-test.onrender.com/add-book",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Zorba the Greek&author=Nikos Kazantzakis"
      }
    );
    let body = await res.text();
    let booksReturned = body.includes("<li>Zorba the Greek (Nikos Kazantzakis)</li>");
    assert.ok(booksReturned, "Add book failed");    
  });

  test('Add invalid book', async function() {
    // Fetch the main page to determine the current count of books
    let res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/");
    let body = await res.text();
    
    // Extract the current count of books (assuming the number of books is shown in the format "Added books: <b>X</b>")
    const initialBookCount = parseInt(body.match(/Added books: <b>(\d+)<\/b>/)[1]);

    // Attempt to add an invalid book (missing author)
    res = await fetch(
      "https://mdzhut200-retake-exam-test.onrender.com/add-book",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Zorba the Greek&author="
      }
    );
    
    // Log the response body for debugging purposes
    body = await res.text();
    // console.log('Response body after invalid book submission:', body);

    // Check if the error message is present
    let errMsg = body.includes("Cannot add book. Name and author fields are required!");
    assert.ok(errMsg, "Add invalid book should display an error message");

    // Fetch the main page again to verify the book count
    res = await fetch("https://mdzhut200-retake-exam-test.onrender.com/");
    body = await res.text();
    // console.log('Main page body after invalid book submission:', body);

    // Extract the book count after the failed submission
    const finalBookCount = parseInt(body.match(/Added books: <b>(\d+)<\/b>/)[1]);

    // Check if the book count remains unchanged
    assert.strictEqual(finalBookCount, initialBookCount, 
        "Add invalid book should not change the books count");
});



});
