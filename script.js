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
const tableBody = document.querySelector("tbody");

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

    // Reset the form
    resetForm();

    // Close the dialog
    dialog.close();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Create new tr
    let newRow = document.createElement("tr");

    // Get object keys
    let keys = Object.keys(myLibrary[myLibrary.length - 1]);
    console.log(keys);

    // Get values for keys, create td DOM elements and append to DOM
    keys.forEach((key) => {
        let newData = document.createElement("td");
        newData.innerText = myLibrary[myLibrary.length - 1][key];
        if (myLibrary[myLibrary.length - 1][key] == "Read") {
            
            newData.classList.add("bg-green");
            
        }
        else if (myLibrary[myLibrary.length - 1][key] == "Not Read") {
            newData.classList.add("bg-red");
        }
        if (key == "read") {
            newData.classList.add("flex-container");
            let switchButton = document.createElement("button");
            switchButton.innerText = "Change";
            newData.appendChild(switchButton);
        }
        newRow.appendChild(newData);
    });

    // Append new tr
    tableBody.appendChild(newRow);
});

function resetForm() {
    // Reset input values to empty strings
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('pages').value = '';

    document.getElementById('not-read').checked = true;
};




