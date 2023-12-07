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
    confirmBtn.addEventListener("click", showAsTableFunc);

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

    function showAsTableFunc(event) {
        event.preventDefault();
        let myLibrary = Book.myLibrary;

        // Create new tr
        let newRow = document.createElement("tr");
        newRow.setAttribute("data-row-id", `${myLibrary[myLibrary.length - 1].id}`);

        // Get object keys
        let keys = Object.keys(myLibrary[myLibrary.length - 1]);

        // Get values for keys, create td DOM elements and append to DOM
        keys.forEach((key) => {
            if (key == "id") return;
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
                    let rowId = newRow.getAttribute("data-row-id");
                    for (let i = 0; i < newData.classList.length; i++) {
                        if (newData.classList[i] == "bg-red") {
                            myLibrary.forEach((item) => {
                                if (item.id == rowId) {
                                    item.read = "Read";
                                }
                            });
                            
                            newData.innerText = "Read";
                            newData.appendChild(switchButton);
                            newData.classList.remove("bg-red");
                            newData.classList.add("bg-green");
                            return;
                        }
                        else if (newData.classList[i] == "bg-green") {
                            myLibrary.forEach((item) => {
                                if (item.id == rowId) {
                                    item.read = "Not Read";
                                }
                            });
    
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
        removeButton.setAttribute("data-button-id", `${myLibrary[myLibrary.length - 1].id}`);
        removeButton.innerText = "Remove";
        removeButton.classList.add("removeBtn");
        newCell.appendChild(removeButton);
        newRow.appendChild(newCell);

        removeButton.addEventListener("click", (event) => {
            event.preventDefault();

            let btnId = removeButton.getAttribute("data-button-id");
            let rowId = newRow.getAttribute("data-row-id");
            if (btnId == rowId) {
                myLibrary.forEach((book) => {
                    if (book.id == btnId) myLibrary.splice(myLibrary.indexOf(book), 1);
                });
                newRow.remove();
            }
        });
    }

})();
