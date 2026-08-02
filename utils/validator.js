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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return isNonEmpty(email) && EMAIL_REGEX.test(email);
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

export function validateNewMember(member, Members) {
  const errors = [];

  if (!isPositive(member.id))
    errors.push("Member id must be a positive integer.");
  else if (Members.some((m) => m.id === member.id))
    errors.push(`Member id ${member.id} already exists.`);

  if (!isNonEmpty(member.firstName))
    errors.push("First name is required.");
  if (!isNonEmpty(member.lastName)) errors.push("Last name is required.");

  if (!isValidEmail(member.email)) errors.push("A valid email is required.");
  else if (
    Members.some((m) => m.email.toLowerCase() === member.email.toLowerCase())
  ) {
    errors.push(`Email ${member.email} is already registered.`);
  }

  if (member.phone !== undefined) {
    if (!isNonEmpty(member.phone)) errors.push("Phone is required.");
    else if (Members.some((m) => m.phone === member.phone))
      errors.push(`Phone ${member.phone} is already registered.`);
  }

  return { valid: errors.length === 0, errors };
}
