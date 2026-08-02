export function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isPositive(value) {
  return Number.isInteger(value) && value > 0;
}

export function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year > 0 && year <= currentYear;
}

export function ValidateBook(Book, Books) {
  const errors = [];

  if (!isPositive(Book.id)) errors.push("Book id must be positive.");
  else if (Books.some((b) => b.id == Book.id))
    errors.push(`Book id ${Book.id} already exists.`);

  if (!isNonEmpty(Book.title)) errors.push("Book title is required!");
  if (!isNonEmpty(Book.author)) errors.push("Book author is required!");

  if (Book.isbn !== undefined) {
    if (!isNonEmpty(Book.isbn)) errors.push("ISBN is required!");
    else if (Books.some((b) => b.isbn == Book.isbn))
      errors.push(`ISBN ${Book.isbn} already exists.`);
  }

  if (
    Book.publicationYear !== undefined &&
    !isValidYear(Book.publicationYear)
  ) {
    errors.push("Publication year must be a valid year!");
  }

  if (!isPositive(Book.totalCopies))
    errors.push("Total copies must be positive!");

  return { valid: errors.length === 0, errors };
}
