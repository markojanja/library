(function () {
    const app = document.getElementById("app");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const readStatus = document.getElementById("select");
    const myForm = document.querySelector("#form");
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close-modal");
    const modalBtn = document.getElementById("modal-btn");

    class Book {
        constructor(title, author, pages, status) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.status = status;
        }
    }

    class Library {
        constructor() {
            this.books = []
        }
        addBook(book) {
            this.books = JSON.parse(localStorage.getItem('books'))
            this.books.push(book)
        }
        initLocalStorage() {
            const getBooks = localStorage.getItem('books')
            if (getBooks === null) {
                window.onload = localStorage.setItem('books', JSON.stringify(this.books))
            } else { window.onload = displayBooks()}
        }
        setLocalStorage(){
            localStorage.setItem('books', JSON.stringify(this.books))
        }
        getLocalStorage(){
            this.books = JSON.parse(localStorage.getItem('books'))
        }  
    }

    const library = new Library()
    library.initLocalStorage()
    getLibrary()
    modalBtn.addEventListener("click", () => {
        modal.classList.toggle("show-modal");
    });

    myForm.addEventListener("submit", function (e) {
        e.preventDefault();
        readStatus.checked ?
            (readStatus.value = "Read") :
            (readStatus.value = "Not read");
        let newBook = new Book(
            title.value,
            author.value,
            pages.value,
            readStatus.value
        );

        library.getLocalStorage()
        library.addBook(newBook)
        library.setLocalStorage()

        getLibrary();
        modal.classList.remove("show-modal");
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove("show-modal")
    })

    function displayBooks() {
        library.getLocalStorage()
        app.innerHTML = "";
        library.books.map((book) => {
            const elementArray = []
            const card = document.createElement("div");
            generateElement('span', 'Title', elementArray)
            generateElement('h2', book.title, elementArray)
            generateElement('span', 'Author', elementArray)
            generateElement('h2', book.author, elementArray)
            generateElement('span', 'Pages', elementArray)
            generateElement('p', book.pages, elementArray)
            const cardBtn = generateElement('button', book.status, elementArray)
            const closeBtn = generateElement('button', 'Remove', elementArray)
            app.appendChild(card);
            for (element of elementArray) {
                card.appendChild(element)
            }
            card.classList.add("card");
            closeBtn.classList.add("close-btn");
            cardBtn.classList.add("card-btn");
            cardBtn.textContent === "Read" ?
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
                let book = library.books.find((book) => title === book.title);

                if (book.status === "Read") {
                    book.status = "Not read";
                    btn.textContent = book.status;
                    btn.classList.remove("read");
                    btn.classList.add("not-read");
                } else {
                    book.status = "Read";
                    btn.textContent = book.status;
                    btn.classList.remove("not-read");
                    btn.classList.add("read");
                }
                library.setLocalStorage()
            });
        });
    }

    function removeBook() {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            const closeBtn = card.querySelector(".close-btn");
            const cardTitle = card.children[1];
            closeBtn.addEventListener("click", function () {
                library.books = JSON.parse(localStorage.getItem('books'))
                let title = cardTitle.textContent;
                let bookIndex = library.books.findIndex((book) => title === book.title);
                library.books.splice(bookIndex, 1);
                library.setLocalStorage()
                getLibrary();
            });
        });
    }

    function getLibrary() {
        if (library.books.length > 0) {
            app.innerHTML = "";
            displayBooks();
            changeReadStatus();
            removeBook();
        } else {
            app.innerHTML = "";
            let title = generateElement('h1', 'No books added', null)
            app.appendChild(title);
        }
    }
    function generateElement(el, content = '', arr = null) {
        const element = document.createElement(el);
        content ? element.textContent = content : false
        arr ? arr.push(element) : false
        return element
    }
})()