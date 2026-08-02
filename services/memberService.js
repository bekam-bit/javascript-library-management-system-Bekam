import { members } from "../data/members.js";
import {
  validateNewMember,
  isNonEmpty,
  isValidEmail,
} from "../utils/validator.js";

// Register new members
export function registerMember(newMember) {
  const member = {
    ...newMember,
    borrowedBooks: newMember.borrowedBooks || [],
  };

  const { valid, errors } = validateNewMember(member, members);
  if (!valid) {
    throw new Error(`Cannot register member: ${errors.join(" ")}`);
  }

  members.push(member);
  return member;
}

// Return all registered members
export function getAllMembers() {
  return members;
}

// return single member with a given id
export function getMemberById(id) {
  return members.find((m) => m.id === id);
}

// search by id, fullname or email(case insensitive)
export function searchMembers(query = {}) {
  return members.filter((m) => {
    if (query.id !== undefined && m.id !== query.id) return false;
    if (query.name) {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      if (!fullName.includes(query.name.toLowerCase())) return false;
    }
    if (
      query.email &&
      !m.email.toLowerCase().includes(query.email.toLowerCase())
    )
      return false;
    return true;
  });
}

// update existing member fields
export function updateMember(id, updates) {
  const member = getMemberById(id);
  if (!member) throw new Error(`Cannot update: no member found with id ${id}.`);

  if (updates.firstName !== undefined) {
    if (!isNonEmptyString(updates.firstName))
      throw new Error("First name is requires!");
    member.firstName = updates.firstName;
  }
  if (updates.lastName !== undefined) {
    if (!isNonEmptyString(updates.lastName))
      throw new Error("Last name is required!");
    member.lastName = updates.lastName;
  }
  if (updates.email !== undefined) {
    if (!isValidEmail(updates.email))
      throw new Error("A valid email is required.");
    const taken = members.some(
      (m) =>
        m.id !== id && m.email.toLowerCase() === updates.email.toLowerCase(),
    );
    if (taken)
      throw new Error(
        `Email ${updates.email} is already registered to another member.`,
      );
    member.email = updates.email;
  }
  if (updates.phone !== undefined) {
    if (!isNonEmpty(updates.phone))
      throw new Error("Phone number is required!");
    const taken = members.some((m) => m.id !== id && m.phone === updates.phone);
    if (taken)
      throw new Error(
        `Phone ${updates.phone} is already registered to another member.`,
      );
    member.phone = updates.phone;
  }

  return member;
}

// Remove a member if it has no borrowed book/s records
export function deleteMember(id) {
  const index = members.findIndex((m) => m.id === id);
  if (index === -1)
    throw new Error(`Cannot delete: no member found with id ${id}.`);

  const member = members[index];
  if (member.borrowedBooks.length > 0) {
    throw new Error(
      `Cannot delete ${member.firstName} ${member.lastName}: ${member.borrowedBooks.length} book(s) still borrowed.`,
    );
  }

  return members.splice(index, 1)[0];
}
