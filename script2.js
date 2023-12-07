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

    static get myLibrary() {
        return this.#myLibrary;
    }
}

const render = (function() {
    // Store DOM references
    const dialog =document.querySelector("dialog");
    const addBookBtn = document.querySelector(".addBook-btn");
    const cancelBtn = document.querySelector("#cancelBtn");
    const confirmBtn = document.querySelector("#confirmBtn");
    const tableBody = document.querySelector("tbody");

    // Bind event listeners
    addBookBtn.addEventListener("click", () => dialog.showModal());
    cancelBtn.addEventListener("click", () => dialog.close());
    confirmBtn.addEventListener("click", addBookFunc);

    function addBookFunc(event) {
        event.preventDefault();

        // Get input values
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const pages = document.getElementById("pages").value;
        const readStatus = document.querySelector(`input[name="read-status"]:checked`).value;

        if ( author == "" || title == "") {
            alert("Must enter author and title for the book.");
            return;
        };

        //Create Book instance
        let newBook = new Book (author, title, pages, readStatus);
        Book.addBookToLibrary(newBook);

        // Reset inputs to empty strings
        resetForm();

        // Close the dialog
        dialog.close();
    }

    function resetForm() {
        // Reset input values to empty strings
        document.getElementById('author').value = '';
        document.getElementById('title').value = '';
        document.getElementById('pages').value = '';
    
        document.getElementById('not-read').checked = true;
    };

})();
