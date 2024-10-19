import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit Icon

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    props.onEdit(props.id); // Trigger the edit function when Edit is clicked
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleEditClick}>
        <EditIcon />
      </button>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
