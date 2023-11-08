const myLibrary = [];

const Book = function(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = Boolean(read);
};

const addBookToLibrary = {
    // do stuff here
}

const dialog =document.querySelector("dialog");
const addBookBtn = document.querySelector(".addBook-btn");
addBookBtn.addEventListener("click", () => dialog.showModal());