import React, { useState, useContext } from 'react';
import noteContext from "../Context/noteContext";

const NoteItems = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, updateNote } = context;
  const { note } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedDescription, setUpdatedDescription] = useState(note.description);

  // Function to handle the update
  const handleUpdate = async () => {
    // Update the note if editing is true
    await updateNote(note._id, updatedTitle, updatedDescription);
    setIsEditing(false);  // Close the editing mode after update
  };

  // Function to handle pressing the 'Enter' key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3 note-card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-start justify-content-between">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="form-control me-2 note-input"
                  placeholder="Update title"
                  onKeyDown={handleKeyPress}  // Listen for Enter key in the title input
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="form-control note-textarea"
                  placeholder="Update description"
                  onKeyDown={handleKeyPress}  // Listen for Enter key in the description textarea
                />
              </>
            ) : (
              <>
                <h5 className="card-title note-title">{note.title}</h5>
                <p className="card-text note-description">{note.description}</p>
              </>
            )}
            <div className="note-actions">
              <i
                className="far fa-trash-alt mx-2 delete-icon"
                onClick={() => deleteNote(note._id)}
              ></i>
              <i
                className="fa fa-pencil-square-o edit-icon"
                aria-hidden="true"
                onClick={() => setIsEditing(true)}  // Allow to enter editing mode
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;
