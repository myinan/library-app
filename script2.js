class Book {
    static #myLibrary = [];
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.id = Date.now(); // Unique identifier for each book
    }

    static addBookToLibrary(obj) {
        this.#myLibrary.push(obj);
    };
}

const newBook = new Book("A","B","C","D","E")
