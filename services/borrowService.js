import { getBookById } from "./bookService.js";
import { getMemberById } from "./memberService.js";
import { todayISO } from "../utils/helpers.js";

export const borrowRecords = [];

export function borrowBook(memberId, bookId) {
  const member = getMemberById(memberId);

  if (!member)
    throw new Error(`Can not borrow: no member found with id ${memberId}`);

  const book = getBookById(bookId);

  if (!book) throw new Error(`Can not borrow: no book found with id ${bookId}`);

  if (member.borrowedBooks.includes(bookId)) {
    throw new Error(
      `${member.firstName} ${member.lastName} has already borrowed "${book.title}".`,
    );
  }

  if (book.availableCopies <= 0) {
    throw new Error(
      `Can not borrow: ${book.title} has no available copies left.`,
    );
  }

  book.availableCopies -= 1;
  member.borrowedBooks.push(bookId);

  const record = { memberId, bookId, borrowDate: todayISO(), returned: false };
  borrowRecords.push(record);
  return record;
}

export function returnBook(memberId, bookId) {
  const member = getMemberById(memberId);
  if (!member)
    throw new Error(`Cannot return: no member found with id ${memberId}.`);

  const book = getBookById(bookId);
  if (!book) throw new Error(`Cannot return: no book found with id ${bookId}.`);

  const borrowedIndex = member.borrowedBooks.indexOf(bookId);
  if (borrowedIndex === -1) {
    throw new Error(
      `${member.firstName} ${member.lastName} did not borrow "${book.title}".`,
    );
  }

  member.borrowedBooks.splice(borrowedIndex, 1);
  book.availableCopies = Math.min(book.availableCopies + 1, book.totalCopies);

  const record = borrowRecords.findLast(
    (r) => r.memberId === memberId && r.bookId === bookId && !r.returned,
  );

  if (record) record.returned = true;

  return record || { memberId, bookId, returned: true };
}

export function getActiveBorrows(){
    return borrowedBooks.filter((r) => !r.returned);
}