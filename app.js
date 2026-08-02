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

import { formatBook, formatMember } from "./utils/helpers.js";

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
