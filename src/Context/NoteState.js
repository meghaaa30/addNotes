import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error('Failed to fetch notes:', error.message);
    }
  };

  const addNote = async (title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const note = await response.json();
      setNotes(prevNotes => [...prevNotes, note]);
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      const json = await response.json();
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      console.log('Note deleted');
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const updateNote = async (id, title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
  
      // Fetch the updated note from the response or use the response as the updated note
      const updatedNote = await response.json();
      const newNotes = notes.map(note =>
        note._id === id ? updatedNote : note
      );
      setNotes(newNotes);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };
  

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
