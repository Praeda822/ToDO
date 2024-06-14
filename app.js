"use strict";

class notesApp {
  constructor() {
    // Selectors
    this.noteForm = document.getElementById("note-form");
    this.noteInput = document.getElementById("note-input");
    this.notesList = document.getElementById("notes-list");

    // Initiliaze app state

    // Load notes from local storage and display them
    this.loadNotes = document.addEventListener("DOMContentLoaded", loadNotes);
    // Add note event
    this.noteForm = noteForm.addEventListener("submit", addNote);
  }
  // Function to add a new note
  addNote(e) {
    e.preventDefault();

    // Get the note text
    this.noteText = noteInput.value;

    // Create list item element
    this.li = document.createElement("li");
    li.textContent = noteText;

    // Call delBtn function
    delBtn().onclick();

    // Append list item to the notes list
    notesList.appendChild(li);

    // Save note to local storage
    saveNoteToLocalStorage(noteText);

    // Clear input
    noteInput.value = "";
  }

  delBtn() {
    this.deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = deleteNote;
    // Append delete button to the list item
    li.appendChild(deleteBtn);
  }

  // Function to delete a note
  deleteNote() {
    this.li = this.parentElement;
    this.noteText = li.textContent.replace("Delete", "").trim();

    // Remove note from local storage
    deleteNoteFromLocalStorage(noteText);

    // Remove list item from the notes list
    notesList.removeChild(li);
  }

  // Function to save a note to local storage
  saveNoteToLocalStorage(note) {
    this.notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Function to get notes from local storage
  getNotesFromLocalStorage() {
    this.notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }

  // Function to delete a note from local storage
  deleteNoteFromLocalStorage(note) {
    this.notes = getNotesFromLocalStorage();
    notes = notes.filter((n) => n !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Function to load notes from local storage and display them
  loadNotes() {
    this.notes = getNotesFromLocalStorage();
    notes.forEach((note) => {
      this.li = document.createElement("li");
      li.textContent = note;

      this.deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete");
      deleteBtn.onclick = deleteNote;

      li.appendChild(deleteBtn);

      notesList.appendChild(li);
    });
  }
}