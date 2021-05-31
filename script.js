"use strict";

const table = document.querySelector("table");
const newBookBtn = document.querySelector("#newBook");
const bgForm = document.querySelector("#bgForm");
const closeFormBtn = document.querySelector("#closeForm");
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read." : "not read yet."
    }`;
  };
}

let myBook = new Book("My Book", "Joe", 300, false);
let crimeAndPunishment = new Book(
  "Crime and Punishment",
  "Fyodor Dostoyevsky",
  292,
  false
);
let theLongGoodbye = new Book(
  "The Long Goodbye",
  "Raymond Chandler",
  379,
  true
);
let myLove = new Book("Farewell, My Lovely", "Raymond Chandler", 292, false);

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

addBookToLibrary(myBook);
addBookToLibrary(crimeAndPunishment);
addBookToLibrary(theLongGoodbye);
addBookToLibrary(myLove);

function displayBooks(myLibrary) {
  myLibrary.map((book) => generateTable(book.info()));
}

function generateTable(text) {
  let row = table.insertRow();
  let cell = row.insertCell();
  cell.textContent = text;
}

displayBooks(myLibrary);

newBookBtn.addEventListener("click", () => {
  bgForm.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => (bgForm.style.display = "none"));
