import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null); // Track the note being edited

  // Load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('todo-app');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem('todo-app', JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNoteHandler(id) {
    // Find the note to be edited
    const noteToEdit = notes.find((note, index) => index === id);
    setEditNote({ ...noteToEdit, id }); // Set the note to be edited with its index as id
  }

  function updateNoteHandler(updatedNote) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        return index === updatedNote.id ? updatedNote : noteItem;
      });
    });
    setEditNote(null); // Reset editNote after updating
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} onUpdate={updateNoteHandler} editNote={editNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNoteHandler}  //Pass edit handler to each Note
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
