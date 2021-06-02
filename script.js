"use strict";

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
  myLibrary.map((book) => {
    generateTable(book.info(), book.title);
  });
}

function generateTable(text, title) {
  const table = document.querySelector("table");
  let row = table.insertRow();
  row.id = `${title}`;
  console.log(row);
  let cell = row.insertCell();
  cell.textContent = text;
  createRrmoveBtn(row, title);
}

function createRrmoveBtn(row, title) {
  let btn = document.createElement("button");
  btn.type = "button";
  btn.className = "remove-btn";
  btn.textContent = "Remove";
  btn.dataset.btnName = `${title}`;
  row.appendChild(btn);

  btn.addEventListener("click", (e) => {
    let temp = e.target.dataset.btnName;
    removeBook(temp);
  });
}

newBookBtn.addEventListener("click", () => {
  bgForm.style.display = "flex";
});

closeFormBtn.addEventListener("click", () => (bgForm.style.display = "none"));

function getData() {
  let title, author, pages, read;
  const formData = document.querySelectorAll("input");
  formData.forEach((input) => {
    if (input.id === "read" && input.checked) read = true;
    else if (input.id === "notRead" && input.checked) read = false;
    else if (input.id === "title") title = input.value;
    else if (input.id === "author") author = input.value;
    else if (input.id === "pages") pages = input.value;
  });

  let newBook = new Book(title, author, pages, read);

  addBookToLibrary(newBook);
  displayBooks(myLibrary);
}

const submitBtn = document.querySelector("#submitForm");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

function removeBook(temp) {
  document.getElementById(temp).remove();
  let x = myLibrary.findIndex((book) => book.title === temp);
  myLibrary.splice(x, 1);
}
displayBooks(myLibrary);
