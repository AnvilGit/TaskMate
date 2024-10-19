import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    id: null, //Add id to track note
    title: "",
    content: ""
  });

  // If editing an existing note, populate it into the input fields
  useEffect(() => {
    if (props.editNote) {
      setNote(props.editNote);
      setExpanded(true); // Expand if editing
    }
  }, [props.editNote]);


  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    if (note.title || note.content) {
      // Check if we're editing or adding a new note
      if (note.id !== null) {
        props.onUpdate(note); // If it has an id, update it
      } else {
        props.onAdd(note); // Otherwise, add a new note
      }
      
      setNote({
        id: null,
        title: "",
        content: ""
      });
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded ? (<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> 
        ): null}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {/* Show the submit button only if there's content in title or content */}
        { (note.tile || note.content) && (
        <Zoom in={isExpanded}>
        <Fab onClick={submitNote}>
          <AddCircleOutlineIcon />
          </Fab>
        </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
