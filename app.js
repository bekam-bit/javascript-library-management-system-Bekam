import {
  addBook,
  getAllBooks,
  searchBooks,
  updateBook,
  deleteBook,
} from "./services/bookService.js";

import {
  registerMember,
  getAllMembers,
  searchMembers,
  updateMember,
  deleteMember,
} from "./services/memberService.js";

import {
  libraryAnalytics,
  totalBooksPerCategory,
  getMostBorrowedCategory,
  getBooksPublishedAfter,
  getUnavailableBooks,
  getMembersWithActiveBorrows,
} from "./services/reportService.js";

import { formatBook, formatMember } from "./utils/helpers.js";

import { borrowBook, returnBook } from "./services/borrowService.js";

function section(title) {
  console.log(`\n=== ${title} ===`);
}

// Book Management
section("Book Management");

addBook({
  id: 4,
  title: "Atomic Habits",
  author: "James Clear",
  category: "Self-Help",
  publicationYear: 2018,
  isbn: "9780735211292",
  totalCopies: 4,
});

console.log("All books:");
getAllBooks().forEach((b) => console.log("  " + formatBook(b)));

console.log("\nSearch books by author 'martin':");
searchBooks({ author: "martin" }).forEach((b) =>
  console.log("  " + formatBook(b)),
);

updateBook(3, { totalCopies: 3 });
console.log("\nUpdated 'Sapiens' totalCopies to 3:");
console.log("  " + formatBook(getAllBooks().find((b) => b.id === 3)));

try {
  deleteBook(1);
  console.log("\nDeleted book id 1 successfully.");
} catch (err) {
  console.log("\nDelete failed:", err.message);
}

// Member Management
section("Member Management");

registerMember({
  id: 103,
  firstName: "Bek",
  lastName: "Adam",
  email: "bek@example.com",
  phone: "0933112233",
});

console.log("All members:");
getAllMembers().forEach((m) => console.log("  " + formatMember(m)));

console.log("\nSearch member by name 'jane':");
searchMembers({ name: "jane" }).forEach((m) =>
  console.log("  " + formatMember(m)),
);

updateMember(103, { phone: "0933999888" });
console.log("\nUpdated Bek's phone number.");

try {
  deleteMember(101);
  console.log("\nDeleted member id 101 successfully.");
} catch (err) {
  console.log("\nDelete failed:", err.message);
}

// Borrow & Return Workflow
section("Borrow & Return");
 
try {
  const record = borrowBook(102, 2); 
  console.log("Borrowed:", record);
} catch (err) {
  console.log("Borrow failed:", err.message);
}
 
try {
  borrowBook(102, 2); 
} catch (err) {
  console.log("Expected failure (duplicate borrow):", err.message);
}
 
console.log("\nBooks after borrow:");
getAllBooks().forEach((b) => console.log("  " + formatBook(b)));
 
try {
  const record = returnBook(102, 2);
  console.log("\nReturned:", record);
} catch (err) {
  console.log("\nReturn failed:", err.message);
}

try {
  const record = borrowBook(103, 4); 
  console.log("\nBorrowed:", record);
} catch (err) {
  console.log("\nBorrow failed:", err.message);
}
 
console.log("\nBooks after second borrow:");
getAllBooks().forEach((b) => console.log("  " + formatBook(b)));

// Reports & Statistics
section("Reports & Statistics");
 
console.log("Library statistics:", libraryAnalytics());
console.log("Category insights:", totalBooksPerCategory());
console.log("Most borrowed category:", getMostBorrowedCategory());
console.log("Books published after 2010:", getBooksPublishedAfter(2010).map((b) => b.title));
console.log("Unavailable books:", getUnavailableBooks().map((b) => b.title));
console.log("Members with active borrows:", getMembersWithActiveBorrows().map((m) => `${m.firstName} ${m.lastName}`));


// Member Deletion Protection Demo
section("Deletion Protection Demo");
 
try {
  borrowBook(102, 3); 
  deleteMember(102); 
} catch (err) {
  console.log("Can not delete, Member has active borrow:", err.message);
}
 
returnBook(102, 3);
const removed = deleteMember(102);
console.log("Deleted member after return:", `${removed.firstName} ${removed.lastName}`);