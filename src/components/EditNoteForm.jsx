import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/apiConfig";
import "../components/AddNoteForm.css";

const EditNoteForm = ({ oneNoteId, setIsUpdated }) => {
  const [notesDate, setNotesDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notesContent, setNotesContent] = useState("");

  // Getting the current state to preset the form

  useEffect(() => {
    axios
      .get(`${API_URL}/notes/${oneNoteId}`)
      .then((res) => {
        console.log(res);
        setNotesDate(res.data.date);
        setImageUrl(res.data.imageUrl);
        setNotesContent(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [oneNoteId]);

  //Handle Update Note

  async function handleEditNote(event) {
    event.preventDefault();
    console.log("We are editing!");
    const editNote = {
      date: notesDate,
      imageUrl: imageUrl,
      content: notesContent,
    };
    try {
      const response = await axios.patch(
        `${API_URL}/notes/${oneNoteId}`,
        editNote
      );
      console.log("Done", response.data);
      setIsUpdated(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleEditNote} className="add-note-form">
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
      <button type="submit" className="add-note-form-btn">Update Note</button>
    </form>
  );
};

export default EditNoteForm;
