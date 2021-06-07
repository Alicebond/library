"use strict";

const myLibrary = [];

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

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  storeData(myLibrary);
}

function clickNewBookBtn() {
  const bgForm = document.querySelector("#bgForm");
  const newBookBtn = document.querySelector("#newBook");
  newBookBtn.addEventListener("click", () => {
    bgForm.style.display = "flex";
  });
}

function closeForm() {
  const closeFormBtn = document.querySelector("#closeForm");
  closeFormBtn.addEventListener("click", () => (bgForm.style.display = "none"));
}

function submitData() {
  const submitBtn = document.querySelector("#submitForm");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getData();
  });
}

function getData() {
  let title, author, pages, read;
  let formData = document.querySelectorAll("input");

  let val1 = document.getElementById("title").value;
  let val2 = document.getElementById("author").value;
  let val3 = document.getElementById("pages").value;
  let val4 = document.getElementById("read").value;
  if (val1 === "" || val2 === "" || val3 === "" || val4 === "") return;

  console.log(val3);

  formData.forEach((input) => {
    if (input.id === "read" && input.checked) read = true;
    else if (input.id === "notRead" && input.checked) read = false;
    else if (input.id === "title") title = input.value;
    else if (input.id === "author") author = input.value;
    else if (input.id === "pages") pages = input.value;
  });

  checkDuplicate(title, author, pages, read);
}

function checkDuplicate(title, author, pages, read) {
  let a = myLibrary.find(
    (book) => (book.title === title, book.author === author)
  );

  if (!a) {
    let newBook = new Book(title, author, pages, read);

    addBookToLibrary(newBook);
    generateTable(newBook.info(), newBook.title);
  } else {
    alert("The book already has been added!");
    document.getElementById("formContainer").reset();
    return;
  }
}

function displayBooks(myLibrary) {
  myLibrary.map((book) => {
    generateTable(book.info(), book.title);
  });
}

function generateTable(text, title) {
  const table = document.querySelector("table");
  let row = table.insertRow();
  row.id = `${title}`;
  let cell = row.insertCell();
  cell.textContent = text;
  createDropDownList(row, title);
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
    let btnName = e.target.dataset.btnName;
    removeBook(btnName);
  });
}

function removeBook(btnName) {
  document.getElementById(btnName).remove();
  let x = myLibrary.findIndex((book) => book.title === btnName);
  myLibrary.splice(x, 1);
  storeData(myLibrary);
}

function createDropDownList(row, title) {
  let options = ["Change Status", "Read", "Want to Read"];
  let select = document.createElement("select");
  select.name = "status";
  select.className = "change-status";
  select.dataset.title = `${title}`;

  for (let i of options) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }

  let label = document.createElement("label");
  label.htmlFor = "status";

  row.appendChild(label).appendChild(select);

  select.addEventListener("change", (e) => {
    let changedStatus = e.target.value;
    let changeTarget = e.target.dataset.title;
    changeStatus(changedStatus, changeTarget);
  });
}

function changeStatus(changedStatus, changeTarget) {
  let x = myLibrary.findIndex((book) => book.title === changeTarget);
  changedStatus === "Read"
    ? (myLibrary[x].read = true)
    : (myLibrary[x].read = false);

  let el = document.getElementById(changeTarget);
  el.firstChild.textContent = myLibrary[x].info();
  storeData(myLibrary);
}

function storeData(myLibrary) {
  localStorage.clear();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function checkStorage() {
  if (!localStorage.getItem("myLibrary")) return;
  else {
    let currentString = JSON.parse(localStorage.getItem("myLibrary"));
    let currentLibrary = currentString.map(
      (item) => new Book(item.title, item.author, item.pages, item.read)
    );
    displayBooks(currentLibrary);
  }
}

function init() {
  checkStorage();
  clickNewBookBtn();
  closeForm();
  submitData();
}

init();

////////////////////////////////////////////
// Example:
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

addBookToLibrary(myBook);
addBookToLibrary(crimeAndPunishment);
addBookToLibrary(theLongGoodbye);
addBookToLibrary(myLove);
