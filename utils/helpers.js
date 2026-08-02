export function formatBook(book) {
  return `[${book.id}] "${book.title}" by ${book.author} (${book.category}, ${book.publicationYear}) — ${book.availableCopies}/${book.totalCopies} available`;
}

export function formatMember(member) {
  return `[${member.id}] ${member.firstName} ${member.lastName} <${member.email}> — ${member.borrowedBooks.length} book(s) borrowed`;
}

export function todayISO(){
    return new Date().toISOString().split("T")[0];
}