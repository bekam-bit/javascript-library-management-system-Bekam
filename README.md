# Library Management System

**Full Name:** _[Bekam Yoseph]_

A console-based Library Management System built with **vanilla JavaScript** and **Node.js ES Modules**. All state lives in memory and every feature is demonstrated by calling functions directly in `app.js`.

## Features

- **Book Management** — add, view, search (by id/title/author/category), update, and conditionally delete books (deletion blocked while any copy is checked out).
- **Member Management** — register, view, search (by id/name/email), update, and conditionally delete members (deletion blocked while they hold borrowed books).
- **Borrow & Return** — validates member/book existence, copy availability, and duplicate borrows; updates `availableCopies` and each member's `borrowedBooks` list; keeps a full borrow-record history.
- **Reports & Statistics** — total books/members, active borrows, category breakdowns, most-borrowed category, top borrowed books, books published after a given year, fully unavailable books, and members with active borrows.
- **Validation** — duplicate id/ISBN/email/phone checks, empty-string checks, positive-integer checks, valid-year and valid-email checks — all centralized in `utils/validator.js` and enforced by the services (never crashes on bad input, throws a descriptive `Error` instead).

## JavaScript Concepts & Array Methods Used

- ES6+ `import`/`export` modules, arrow functions, template literals, default parameters, spread/rest, destructuring
- Array methods: `map`, `filter`, `find`, `findIndex`, `some`, `every`, `reduce`, `includes`, `sort`, `splice`
- `Set` for uniqueness counting, `Object.entries` for report aggregation
- Defensive programming via thrown `Error` objects caught at the call site

## Folder Structure

```
library-management/
├── app.js                 # Entry point — orchestrates and demonstrates all features
├── package.json            # "type": "module" enables ES module syntax
├── README.md
├── data/
│   ├── books.js            # In-memory book records (single source of truth)
│   └── members.js          # In-memory member records (single source of truth)
├── services/
│   ├── bookService.js      # Book CRUD + validation calls
│   ├── memberService.js    # Member CRUD + validation calls
│   ├── borrowService.js    # Cross-entity borrow/return transactions + history
│   └── reportService.js    # Read-only analytics over books/members/borrowRecords
└── utils/
    ├── validator.js        # Pure validation functions (no I/O, no mutation)
    └── helpers.js           # id generation, date formatting, display formatting
```

**Architectural rule:** `app.js` never mutates arrays or validates input directly — it only calls service functions and prints their results. Services never call `console.log` — they return values or throw errors.

## Running the Project

```bash
npm install     # no external deps, but sets up node_modules if you add any
node app.js
```

or, using the provided script:

```bash
npm start
```

## Example Usage (from `app.js`)

```js
import { addBook } from "./services/bookService.js";
import { registerMember } from "./services/memberService.js";
import { borrowBook } from "./services/borrowService.js";

addBook({ id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", totalCopies: 5 });
registerMember({ id: 101, firstName: "John", lastName: "Doe", email: "john@example.com" });
borrowBook(101, 1);
```

## Notes

- Deleting a book is only allowed once `availableCopies === totalCopies` (all copies returned).
- Deleting a member is only allowed once their `borrowedBooks` array is empty.
- Borrow records track `memberId`, `bookId`, `borrowDate`, and `returned`, enabling the "most borrowed category" reports.