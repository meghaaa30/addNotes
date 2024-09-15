import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
  
     const host= "http://localhost:5000"
     const notesInitial =[]
     const [notes, setNotes] = useState(notesInitial)
             
     const getNotes= async ()=>{
       const response= await fetch(`${host}/api/notes/fetchnotes`,{
       method:'GET',
       headers: {
          'Content-Type':'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMDU2NTQwYzQ0ZDAyZTE3ZDg1YTMzIn0sImlhdCI6MTcxMTQzOTI2MX0.nivY6CqcM8o_fe5lHoLf11pur9gLjjXZMjIJ4xBDX_0"
     }});
       const json = await response.json() 
       console.log(json)
    setNotes(json)
     }

     const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMDU2NTQwYzQ0ZDAyZTE3ZDg1YTMzIn0sImlhdCI6MTcxMTQzOTI2MX0.nivY6CqcM8o_fe5lHoLf11pur9gLjjXZMjIJ4xBDX_0"
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
          }
     
      const deleteNote=async (id)=>{
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMDU2NTQwYzQ0ZDAyZTE3ZDg1YTMzIn0sImlhdCI6MTcxMTQzOTI2MX0.nivY6CqcM8o_fe5lHoLf11pur9gLjjXZMjIJ4xBDX_0"
          }
        });
        const json = response.json(); 
        const newNote = notes.filter((note)=>{ return note._id !== id})
        setNotes(newNote)
         console.log("deleted")
      }
      const editNote= async (id,title, description, tag)=>{

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYwMDU2NTQwYzQ0ZDAyZTE3ZDg1YTMzIn0sImlhdCI6MTcxMTQzOTI2MX0.nivY6CqcM8o_fe5lHoLf11pur9gLjjXZMjIJ4xBDX_0"
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
        }  
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{notes, getNotes,addNote, editNote,deleteNote,setNotes}}>
          {props.children}
        </NoteContext.Provider>
      )
    
    
}

export default NoteState;