
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
      this.books = [];
    }
    stotageInit() {
      const getBooks = localStorage.getItem("books");
      if (getBooks === null) {
        window.onload = localStorage.setItem(
          "books",
          JSON.stringify(this.books)
        );
      } else {
        window.onload = this.displayBooks();
      }
    }
    set LocalStorage(_books) {
      return localStorage.setItem("books", JSON.stringify(_books));
    }
    get LocalStorage() {
      return (this.books = JSON.parse(localStorage.getItem("books")));
    }
    addBook(book) {
      this.books = this.LocalStorage;
      this.books.push(book);
    }
    removeBook() {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        const closeBtn = card.querySelector(".close-btn");
        const cardTitle = card.children[1];
        closeBtn.addEventListener("click", () => {
          this.LocalStorage;
          let title = cardTitle.textContent;
          let bookIndex = this.books.findIndex((book) => title === book.title);
          this.books.splice(bookIndex, 1);
          this.LocalStorage = this.books;
          this.displayBooks();
        });
      });
    }
    changeReadStatus() {
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
          this.LocalStorage = this.books;
        });
      });
    }
    displayBooks() {
      const app = document.getElementById("app");
      this.LocalStorage;
      app.innerHTML = "";
      let title = "";
      if (this.books.length === 0) {
        title = generateElement("h1", "No books added?", null);
        app.appendChild(title);
      }
      this.books.map((book) => {
        const elementArray = [];
        const card = document.createElement("div");
        generateElement("span", "Title", elementArray);
        generateElement("h2", book.title, elementArray);
        generateElement("span", "Author", elementArray);
        generateElement("h2", book.author, elementArray);
        generateElement("span", "Pages", elementArray);
        generateElement("p", book.pages, elementArray);
        const cardBtn = generateElement("button", book.status, elementArray);
        const closeBtn = generateElement("button", "Remove", elementArray);
        app.appendChild(card);
        for (let element of elementArray) {
          card.appendChild(element);
        }
        card.classList.add("card");
        closeBtn.classList.add("close-btn");
        cardBtn.classList.add("card-btn");
        cardBtn.textContent === "Read"
          ? cardBtn.classList.add("read")
          : cardBtn.classList.add("not-read");
      });
      this.changeReadStatus();
      this.removeBook();
      this.LocalStorage =this.books;
    }

  }

  const library = new Library();
  library.stotageInit();
  library.displayBooks();

  //handle modal
  const modalController = (()=>{
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close-modal");
    const modalBtn = document.getElementById("modal-btn");
    modalBtn.addEventListener("click", () => {
      modal.classList.toggle("show-modal");
    });
  
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show-modal");
    });
    return{modal}
  })();


  // handle form
  const formController = (()=>{

    const myForm = document.querySelector("#form");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const readStatus = document.getElementById("select");

    myForm.addEventListener("submit", function (e) {
      e.preventDefault();
      readStatus.checked
        ? (readStatus.value = "Read")
        : (readStatus.value = "Not read");
      let newBook = new Book(
        title.value,
        author.value,
        pages.value,
        readStatus.value
      );
  
      library.addBook(newBook);
      library.LocalStorage = library.books;
      myForm.reset();
      modalController.modal.classList.remove("show-modal");
      library.displayBooks();
    });
  })();

//generate html element
  function generateElement(el, content = "", arr = null) {
    const element = document.createElement(el);
    content ? (element.textContent = content) : false;
    arr ? arr.push(element) : false;
    return element;
  }

