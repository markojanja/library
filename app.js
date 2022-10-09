const btn = document.querySelector("#add");
const app = document.getElementById("app");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("select");
const myForm = document.querySelector("#form");
const modal = document.querySelector(".modal");
const modalBtn = document.getElementById("modal-btn");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
const books = [];
let hobbit = new Book("Hobbit", "JRR Tolkein", 300, "read");
books.push(hobbit)
getLibrary();

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    readStatus.checked ?
        (readStatus.value = "read") :
        (readStatus.value = "Not read");
    let newBook = new Book(
        title.value,
        author.value,
        pages.value,
        readStatus.value
    );
    books.push(newBook);
    console.log(books);
    getLibrary();
    modal.classList.remove("show-modal");
});

function displayBooks() {
    app.innerHTML = "";
    books.map(function (book) {
        const card = document.createElement("div");
        const cardTitle = document.createElement("h2");
        const cardAuthor = document.createElement("h2");
        const cardBtn = document.createElement("button");
        const closeBtn = document.createElement("button");
        const span = document.createElement("span");
        const span2 = document.createElement("span");
        card.appendChild(span);
        span.textContent = "title";
        span2.textContent = "author";
        card.appendChild(cardTitle);
        card.appendChild(span2);
        card.appendChild(cardAuthor);
        card.appendChild(cardBtn);
        card.setAttribute("data-index", books.indexOf(book));
        card.classList.add("card");
        card.appendChild(closeBtn);
        closeBtn.textContent = "Remove";
        app.appendChild(card);
        closeBtn.classList.add("close-btn");
        cardTitle.textContent = book.title;
        cardAuthor.textContent = book.author;
        cardBtn.textContent = book.status;
        cardBtn.classList.add("card-btn");
        cardBtn.textContent === "read" ?
            cardBtn.classList.add("read") :
            cardBtn.classList.add("not-read");
        myForm.reset();
    });
}

function changeReadStatus() {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const btn = card.querySelector(".card-btn");
        const cardTitle = card.children[1];
        btn.addEventListener("click", () => {
            let title = cardTitle.textContent;
            let book = books.find((book) => title === book.title);

            if (book.status === "read") {
                book.status = "Not read";
                btn.textContent = book.status;
                btn.classList.remove("read");
                btn.classList.add("not-read");
            } else {
                book.status = "read";
                btn.textContent = book.status;
                btn.classList.remove("not-read");
                btn.classList.add("read");
            }
            console.log(book);
        });
    });
}

function removeBook() {
    const cards = document.querySelectorAll(".card");
    console.log(cards);
    cards.forEach((card) => {
        const closeBtn = card.querySelector(".close-btn");
        const cardTitle = card.children[1];
        closeBtn.addEventListener("click", function () {
            let title = cardTitle.textContent;
            let bookIndex = books.findIndex((book) => title === book.title);
            books.splice(bookIndex, 1);
            getLibrary();
        });
    });
}

function getLibrary() {
    if (books.length > 0) {
        app.innerHTML = "";
        displayBooks();
        changeReadStatus();
        removeBook();
    } else {
        app.innerHTML = "";
        let title = document.createElement("h1");
        title.textContent = "No Books added?";
        app.appendChild(title);
    }
}
modalBtn.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
});