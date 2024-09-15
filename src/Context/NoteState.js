import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
  
     const host= "http://localhost:5000"
     const notesInitial =[]
     const [notes, setNotes] = useState(notesInitial)
             
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
        console.error('Failed to fetch notes:', error);
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
        setNotes([...notes, note]);
      } catch (error) {
        console.error('Failed to add note:', error);
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
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
        console.log('Note deleted');
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    };
    
    const editNote = async (id, title, description) => {
      try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update note');
        }
  
        const updatedNote = await response.json();
        const updatedNotes = notes.map(note =>
          note._id === id ? { ...note, title, description } : note
        );
        setNotes(updatedNotes);
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    };
  
    return (
      <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote, setNotes }}>
        {props.children}
      </NoteContext.Provider>
    );
  };

  export default NoteState;