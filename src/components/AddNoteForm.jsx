import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../config/apiConfig";
import "../components/AddNoteForm.css";

const AddNoteForm = ({ batchId, setNotes, notes, setModalAdd, showToast }) => {
  const [notesDate, setNotesDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notesContent, setNotesContent] = useState("");

  // Handle Create Note

  async function handleCreateNote(event) {
    event.preventDefault();
    console.log("Clicking Submit");
    const newNote = {
      batchId: Number(batchId),
      userId: 1,
      date: notesDate,
      imageUrl: imageUrl,
      content: notesContent,
    };
    try {
      const response = await axios.post(`${API_URL}/notes/`, newNote);
      // console.log("Done", response.data);
      console.log("Add Note Res", response);
      response.status == 201 ? showToast("Note created.", "success") : showToast(response.statusText, "danger")
      setNotes([response.data, ...notes]);
      setModalAdd(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleCreateNote} className="add-note-form">
      <input
        type="date"
        id="notesDate"
        name="notesDate"
        className="add-note-input"
        value={notesDate}
        onChange={(e) => setNotesDate(e.target.value)}
        autoComplete="off"
      />
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        className="add-note-input"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        autoComplete="off"
        placeholder="https://...image-URL"
      />
      <textarea 
        id="notesContent"
        name="notesContent"
        className="add-note-textarea"
        value={notesContent}
        onChange={(e) => setNotesContent(e.target.value)}
        autoComplete="off"
        rows="5"
        placeholder="Write your note here...">
      </textarea>
      <button type="submit" className="add-note-form-btn">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
