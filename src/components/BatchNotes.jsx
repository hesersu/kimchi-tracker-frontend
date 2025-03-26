import React, { useEffect, useState } from "react";
import "../components/BatchNotes.css";
import { useParams } from "react-router";
import axios from "axios";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { API_URL } from "../../config/apiConfig";

const BatchNotes = () => {
  const { batchId } = useParams();
  const [notes, setNotes] = useState();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editNoteId, setEditNoteId] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/notes/?batchId=${batchId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [batchId]);
  //   console.log(oneBatch);
  if (!notes) {
    return <div>Notes is not found!</div>;
  }

  //Handle delete of notes
  function handleDeleteNotes(id) {
    console.log("This is now deleting notes - first backend, then frontend");
    axios
      .delete(`${API_URL}/notes/${id}`)
      .then((res) => {
        const filteredNotes = notes.filter(
          (oneElement) => oneElement.id !== id
        );
        setNotes(filteredNotes);
      })
      .catch((err) => console.log(err));
  }

  // Handle Modal Add
  const toggleModalAdd = () => {
    setModalAdd(!modalAdd);
    console.log(modalAdd);
  };

  if (modalAdd) {
    document.body.classList.add(`active-modal`);
  } else {
    document.body.classList.remove(`active-modal`);
  }

  // Handle Modal Edit
  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
    console.log(modalEdit);
  };

  if (modalEdit) {
    document.body.classList.add(`active-modal`);
  } else {
    document.body.classList.remove(`active-modal`);
  }

  // Handle Setting note to edit

  const setEditNoteProps = (id) => {
    toggleModalEdit();
    setEditNoteId(id);
  };

  console.log(editNoteId);

  //Front End
  return (
    <>
      <h3>Here are my notes!</h3>
      <button className="btn-modal-open" onClick={toggleModalAdd}>
        Add Note
      </button>

      {/* Add Modal Part */}
      {modalAdd && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <h5>Add your notes</h5>
            <AddNoteForm
              batchId={batchId}
              setNotes={setNotes}
              notes={notes}
              setModalAdd={setModalAdd}
            />
            <button className="btn-modal-close" onClick={toggleModalAdd}>
              Close Modal
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal Part */}
      {modalEdit && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <h5>Edit your notes</h5>
            <EditNoteForm oneNoteId={editNoteId} />
            <button onClick={toggleModalEdit}>Close Modal</button>
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
                <button onClick={() => setEditNoteProps(oneNote.id)}>
                  Edit Note
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
