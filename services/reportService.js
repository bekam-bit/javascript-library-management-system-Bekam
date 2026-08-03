import { books } from "../data/books.js";
import { members } from "../data/members.js";
import { getActiveBorrows, borrowRecords } from "./borrowService.js";

// library analytics(reports)
export function libraryAnalytics() {
  const uniqueTitles = new Set(books.map((b) => b.title)).size;
  const totalAvailableCopies = books.reduce((sum, b) => sum + b.availableCopies, 0);
  const totalCopies = books.reduce((sum, b) => sum + b.totalCopies, 0);
 
  return {
    totalBookRecords: books.length,
    uniqueTitles,
    totalCopies,
    totalAvailableCopies,
    totalMembers: members.length,
    activeBorrows: getActiveBorrows().length,
  };
}

// category insights

export function totalBooksPerCategory() {
  return books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});
}

export function getMostBorrowedCategory() {
  const active = getActiveBorrows();
  if (active.length === 0) return null;
 
  const counts = active.reduce((acc, record) => {
    const book = books.find((b) => b.id === record.bookId);
    if (!book) return acc;
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});
 
  const [category, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return { category, count };
}

// special filters

export function getBooksPublishedAfter(year) {
  return books.filter((b) => b.publicationYear > year);
}

export function getUnavailableBooks() {
  return books.filter((b) => b.availableCopies === 0);
}

export function getMembersWithActiveBorrows() {
  return members.filter((m) => m.borrowedBooks.length > 0);
}
 