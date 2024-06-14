"use strict";

class NotesApp {
  constructor() {
    // Selectors
    this.noteForm = document.getElementById("note-form");
    this.noteInput = document.getElementById("note-input");
    this.notesList = document.getElementById("notes-list");

    // Initiliaze app state
    this.initialize();
  }

  initialize() {
    // Load notes from local storage and display them
    document.addEventListener("DOMContentLoaded", () => this.loadNotes());
    // Add note event
    this.noteForm.addEventListener("submit", (e) => this.addNote(e));
  }

  // Function to add a new note
  addNote(e) {
    e.preventDefault();
    // Get the note text
    const noteText = this.noteInput.value;
    // Create list item element
    const li = document.createElement("li");
    li.textContent = noteText;
    // Create delete button
    this.createDelBtn(li);
    // Appends list item to the notes list
    this.notesList.appendChild(li);
    // Save note to local storage
    this.saveNoteToLocalStorage(noteText);
    // Clear any user input
    this.noteInput.value = "";
  }

  createDelBtn(li) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => this.deleteNote(deleteBtn));
    // Append delete button to the list item
    li.appendChild(deleteBtn);
  }

  // Function to delete a note
  deleteNote(deleteBtn) {
    const li = deleteBtn.parentElement;
    const noteText = li.textContent.replace("Delete", "").trim();
    // Remove note from local storage
    this.deleteNoteFromLocalStorage(noteText);
    // Remove list item from the notes list
    this.notesList.removeChild(li);
  }

  // Function to save a note to local storage
  saveNoteToLocalStorage(note) {
    let notes = this.getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Function to get notes from local storage
  getNotesFromLocalStorage() {
    let notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }

  // Function to delete a note from local storage
  deleteNoteFromLocalStorage(note) {
    let notes = this.getNotesFromLocalStorage();
    notes = notes.filter((n) => n !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Function to load notes from local storage and display them
  loadNotes() {
    const notes = this.getNotesFromLocalStorage();
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;

      this.createDelBtn(li);

      this.notesList.appendChild(li);
    });
  }
}

new NotesApp();
