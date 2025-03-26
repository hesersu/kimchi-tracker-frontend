import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/apiConfig";
import { useNavigate } from "react-router";

const EditNoteForm = ({ oneNoteId, setIsUpdated }) => {
  const [notesDate, setNotesDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const nav = useNavigate();

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

  //   // Handle Update Note

  //   async function handleEditNote(event) {
  //     event.preventDefault();
  //     console.log("Clicking Submit");
  //     const editNote = {
  //       batchId: Number(batchId),
  //       userId: 1,
  //       date: notesDate,
  //       imageUrl: imageUrl,
  //       content: notesContent,
  //     };
  //     try {
  //       const response = await axios.patch(
  //         `${API_URL}/notes/${oneNoteId}`,
  //         newNote
  //       );
  //       console.log("Done", response.data);
  //       setNotes([response.data, ...notes]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  return (
    <div>
      <section className="edit-notes-container">
        <form onSubmit={handleEditNote}>
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
          <button type="submit">Update Note</button>
        </form>
      </section>
    </div>
  );
};

export default EditNoteForm;
