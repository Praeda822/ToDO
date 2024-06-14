"use strict";

// Select DOM elements
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

// Load notes from local storage and display them
document.addEventListener("DOMContentLoaded", loadNotes);

// Add note event
noteForm.addEventListener("submit", addNote);

// Function to add a new note
function addNote(e) {
  e.preventDefault();

  // Get the note text
  const noteText = noteInput.value;

  // Create list item element
  const li = document.createElement("li");
  li.textContent = noteText;

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.onclick = deleteNote;

  // Append delete button to the list item
  li.appendChild(deleteBtn);

  // Append list item to the notes list
  notesList.appendChild(li);

  // Save note to local storage
  saveNoteToLocalStorage(noteText);

  // Clear input
  noteInput.value = "";
}

// Function to delete a note
function deleteNote() {
  const li = this.parentElement;
  const noteText = li.textContent.replace("Delete", "").trim();

  // Remove note from local storage
  deleteNoteFromLocalStorage(noteText);

  // Remove list item from the notes list
  notesList.removeChild(li);
}

// Function to save a note to local storage
function saveNoteToLocalStorage(note) {
  let notes = getNotesFromLocalStorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to get notes from local storage
function getNotesFromLocalStorage() {
  let notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

// Function to delete a note from local storage
function deleteNoteFromLocalStorage(note) {
  let notes = getNotesFromLocalStorage();
  notes = notes.filter((n) => n !== note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from local storage and display them
function loadNotes() {
  let notes = getNotesFromLocalStorage();
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = deleteNote;

    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}
