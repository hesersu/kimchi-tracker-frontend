import React, { useEffect, useState } from "react";
import "../components/BatchNotes.css";
import { useParams } from "react-router";
import axios from "axios";
import AddNoteForm from "./AddNoteForm";

const BatchNotes = () => {
  const { batchId } = useParams();
  const [notes, setNotes] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/notes/?batchId=${batchId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [batchId]);

  console.log(notes);

  //   console.log(oneBatch);
  if (!notes) {
    return <div>Notes is not found!</div>;
  }

  //Handle delete of notes
  function handleDeleteNotes(id) {
    console.log(id);
    console.log("This is now deleting notes - first backend, then frontend");
    axios
      .delete(`http://localhost:5005/notes/${id}`)
      .then((res) => {
        console.log(res.data);
        const filteredNotes = notes.filter(
          (oneElement) => oneElement.id !== id
        );
        setNotes(filteredNotes);
      })
      .catch((err) => console.log(err));
  }

  // Handle Modal
  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  if (modal) {
    document.body.classList.add(`active-modal`);
  } else {
    document.body.classList.remove(`active-modal`);
  }

  //Front End
  return (
    <>
      <h3>Here are my notes!</h3>
      <button className="btn-modal-open" onClick={toggleModal}>
        Add Note
      </button>

      {modal && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <AddNoteForm batchId={batchId} setNotes={setNotes} notes={notes} />
            <button className="btn-modal-close" onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}

      <div>
        {notes.map((oneNote) => {
          return (
            <div className="notes-container">
              <section className="notes-image">
                <img src={oneNote.imageUrl} alt="" />
              </section>
              <section className="notes-description">
                <h4>{oneNote.date}</h4>
                <p>{oneNote.content}</p>
                <button onClick={() => handleDeleteNotes(oneNote.id)}>
                  Delete Note
                </button>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BatchNotes;
