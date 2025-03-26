import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddNoteForm = ({ batchId, setNotes, notes }) => {
  const [notesDate, setNotesDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post(
        `http://localhost:5005/notes/`,
        newNote
      );
      console.log("Done", response.data);
      setNotes([response.data, ...notes]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <section className="add-notes-container">
        <form onSubmit={handleCreateNote}>
          <label>Today's date</label>
          <input
            type="date"
            id="notesDate"
            className="notesDate"
            value={notesDate}
            onChange={(e) => setNotesDate(e.target.value)}
          />
          <label>Image URL</label>
          <input
            type="text"
            id="imageUrl"
            className="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label>Note Text</label>
          <input
            type="text"
            id="notesContent"
            className="notesContent"
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
          />
          <button type="submit">Add Note</button>
        </form>
      </section>
    </div>
  );
};

export default AddNoteForm;
