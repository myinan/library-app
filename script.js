const myLibrary = [];

const Book = function(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
};

const addBookToLibrary = function(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
};

const dialog =document.querySelector("dialog");
const addBookBtn = document.querySelector(".addBook-btn");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");

addBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () => dialog.close());
confirmBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Get the input values
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;

    // Get the selected radio button value for read status
    const readStatus = document.querySelector(`input[name="read-status"]:checked`).value;

    // Add the book to the library
    addBookToLibrary(author, title, pages, readStatus);

    console.log(myLibrary);

    // Reset the form
    resetForm();

    // Close the dialog
    dialog.close();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(myLibrary[myLibrary.length - 1]);
});

function resetForm() {
    // Reset input values to empty strings
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('pages').value = '';

    document.getElementById('not-read').checked = true;
};




