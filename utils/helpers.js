export function formatBook(book) {
  return `[${book.id}] "${book.title}" by ${book.author} (${book.category}, ${book.publicationYear}) — ${book.availableCopies}/${book.totalCopies} available`;
}