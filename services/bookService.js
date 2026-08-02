import { books } from "../data/books.js";
import {
  isNonEmpty,
  isPositive,
  isValidYear,
  ValidateBook,
} from "../utils/validator.js";

// Add new Book
export function addBook(newBook) {
  const book = {
    ...newBook,
    availableCopies:
      newBook.availableCopies !== undefined
        ? newBook.availableCopies
        : newBook.totalCopies,
  };

  const { valid, errors } = ValidateBook(book, books);

  if (!valid) {
    throw new Error(`Can not add book: ${errors.join(" ")}`);
  }

  books.push(book);
  return book;
}

// Display all books
export function getAllBooks() {
  return books;
}

// Find book by its id
export function getBookById(id) {
  return books.find((b) => b.id === id);
}

// Search books using id, title, author and category
export function searchBooks(query = {}) {
  return books.filter((b) => {
    if (query.id !== undefined && b.id !== query.id) return false;
    if (
      query.title &&
      !b.title.toLowerCase().includes(query.title.toLowerCase())
    )
      return false;
    if (
      query.author &&
      !b.author.toLowerCase().includes(query.author.toLowerCase())
    )
      return false;
    if (
      query.category &&
      !b.category.toLowerCase().includes(query.category.toLowerCase())
    )
      return false;
    return true;
  });
}

// Update books fields after validation
export function updateBook(id, updates) {
  const book = getBookById(id);
  if (!book) throw new Error(`Can not update: no book found with id ${id}.`);

  if (updates.title !== undefined) {
    if (!isNonEmpty(updates.title)) throw new Error("Title is required!");
    book.title = updates.title;
  }

  if (updates.author !== undefined) {
    if (!isNonEmptyString(updates.author))
      throw new Error("Author is required!");
    book.author = updates.author;
  }

  if (updates.category !== undefined) {
    if (!isNonEmptyString(updates.category))
      throw new Error("Category is required!");
    book.category = updates.category;
  }

  if (updates.publicationYear !== undefined) {
    if (!isValidYear(updates.publicationYear))
      throw new Error("Publication year is invalid!");
    book.publicationYear = updates.publicationYear;
  }

  if (updates.totalCopies !== undefined) {
    if (!isPositive(updates.totalCopies))
      throw new Error("totalCopies must be a positive integer.");
    const borrowedCount = book.totalCopies - book.availableCopies;
    if (updates.totalCopies < borrowedCount) {
      throw new Error(`Cannot set totalCopies below ${borrowedCount}.`);
    }
    book.availableCopies = updates.totalCopies - borrowedCount;
    book.totalCopies = updates.totalCopies;
  }

  return book;
}

// Delete Book using its id
export function deleteBook(id) {
  const index = books.findIndex((b) => b.id === id);
  if (index === -1)
    throw new Error(`Cannot delete: no book found with id ${id}.`);

  const book = books[index];
  if (book.availableCopies !== book.totalCopies) {
    throw new Error(
      `Cannot delete "${book.title}": ${book.totalCopies - book.availableCopies} cop(y/ies) still borrowed.`,
    );
  }

  return books.splice(index, 1)[0];
}
