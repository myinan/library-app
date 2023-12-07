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

    function getInputValues() {
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const pages = document.getElementById("pages").value;

        // Get the selected radio button value for read status
        const readStatus = document.querySelector(`input[name="read-status"]:checked`).value;

        return { author, title, pages, readStatus };
    }

    addBookBtn.addEventListener("click", () => dialog.showModal());
    cancelBtn.addEventListener("click", () => dialog.close());

    confirmBtn.addEventListener("click", addBookFunc);

    function addBookFunc(event) {
        event.preventDefault();
        const inputValues = getInputValues();

        if (inputValues.author == "" || inputValues.title == "") {
            alert("Must enter author and title for the book.");
            return;
        };

        //Create Book instance
        let newBook = new Book(inputValues.author, inputValues.title, inputValues.pages, inputValues.readStatus);
        Book.addBookToLibrary(newBook);

        // Reset input values to empty strings
        resetForm(inputValues.author, inputValues.title, inputValues.pages);

        // Close the dialog
        dialog.close();
    }

    function resetForm(author, title, pages) { 
        author = "";
        title = "";
        pages = "";
    }
})();
