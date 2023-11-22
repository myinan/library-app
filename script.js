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

    if (author == "" || title == "") {
        alert("Must enter author and title for the book.");
        return;
    };

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
    newRow.setAttribute("data-row-number", `${myLibrary.length - 1}`);

    // Get object keys
    let keys = Object.keys(myLibrary[myLibrary.length - 1]);

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

            // Switch read status and bg color
            switchButton.addEventListener("click", (event) => {
                event.preventDefault();
                for (let i = 0; i < newData.classList.length; i++) {
                    if (newData.classList[i] == "bg-red") {
                        myLibrary[myLibrary.length - 1][key] = "Read";
                        newData.innerText = "Read";
                        newData.appendChild(switchButton);
                        newData.classList.remove("bg-red");
                        newData.classList.add("bg-green");
                        return;
                    }
                    else if (newData.classList[i] == "bg-green") {
                        myLibrary[myLibrary.length - 1][key] = "Not Read";
                        newData.innerText = "Not Read";
                        newData.appendChild(switchButton);
                        newData.classList.remove("bg-green");
                        newData.classList.add("bg-red");
                        return;
                    }
                }
            });

        }

        newRow.appendChild(newData);
    });

    // Append new tr
    tableBody.appendChild(newRow);

    // Add "remove entry" button
    let newCell = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.setAttribute("data-button-number", `${myLibrary.length - 1}`);
    removeButton.innerText = "Remove";
    removeButton.classList.add("removeBtn");
    newCell.appendChild(removeButton);
    newRow.appendChild(newCell);

    removeButton.addEventListener("click", (event) => {
        event.preventDefault();

        let btnNum = removeButton.getAttribute("data-button-number");
        let rowNum = newRow.getAttribute("data-row-number");
        if (btnNum == rowNum) {
            newRow.remove();
        }
    })
});

function resetForm() {
    // Reset input values to empty strings
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('pages').value = '';

    document.getElementById('not-read').checked = true;
};




