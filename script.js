"use strict";

let myLibrary = [];

function Book(title, author, number, read) {
  this.title = title;
  this.author = author;
  this.number = number;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.number} pages, ${
      this.read ? "already read." : "not read yet."
    }`;
  };
}

let myBook = new Book("myBook", "Joe", 300, false);

console.log(myBook);

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}
addBookToLibrary(myBook);
console.log(myLibrary);
