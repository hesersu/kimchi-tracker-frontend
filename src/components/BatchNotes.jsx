import React, { useEffect, useState } from "react";
import "../components/BatchNotes.css";
import { useParams } from "react-router";
import axios from "axios";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { API_URL } from "../../config/apiConfig";
import defaultKimchi from "../assets/kimchi-default.png";
import addNoteIcon from "../assets/add-batch-icon.svg";
import viewDetailIcon from "../assets/view-detail-icon.svg";
import deleteBatchIcon from "../assets/delete-icon.svg";
import closeButtonIcon from "../assets/xmark-solid.svg";

const BatchNotes = () => {
  const { batchId } = useParams();
  const [notes, setNotes] = useState();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editNoteId, setEditNoteId] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  const defaultImage = defaultKimchi;

  useEffect(() => {
    axios
      .get(`${API_URL}/notes/?batchId=${batchId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [batchId, isUpdated]);
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

  // console.log(editNoteId);

  //Front End
  return (
    <>
      <div className="add-note-btn-container">
        <button className="add-note-btn" onClick={toggleModalAdd}>
          <img src={addNoteIcon} alt="add icon" className="add-note-btn-img" />
          Add Note
        </button>
      </div>

      {/* Add Modal Part */}
      {modalAdd && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <p className="modal-title">Add your notes</p>
            <AddNoteForm
              batchId={batchId}
              setNotes={setNotes}
              notes={notes}
              setModalAdd={setModalAdd}
            />
            <button className="btn-modal-close" onClick={toggleModalAdd}>
              <img src={closeButtonIcon} alt="close button icon" className="card-icon" />
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal Part */}
      {modalEdit && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <p className="modal-title">Edit your note</p>
            <EditNoteForm oneNoteId={editNoteId} setIsUpdated={setIsUpdated} />
            <button className="btn-modal-close" onClick={toggleModalEdit}>
              <img src={closeButtonIcon} alt="close button icon" className="card-icon" />
            </button>
          </div>
        </div>
      )}
      
      <div className="note-list-container">
        {notes
         .toSorted((a, b) => new Date(b.date) - new Date(a.date))
         .map((oneNote) => {
          return (
            <div className="note-container" key={oneNote.id}>
              <section className="note-image-container">
                <img
                  src={oneNote.imageUrl ? oneNote.imageUrl : defaultImage}
                  alt="note image"
                  className="note-image"
                />
              </section>
              <section className="note-description">
                <p className="note-description-title">
                  Note dated {oneNote.date}
                </p>
                <p className="note-description-content">{oneNote.content}</p>
                <div className="card-controls">
                  <button onClick={() => setEditNoteProps(oneNote.id)} className="card-btn">
                    <img src={viewDetailIcon} alt="View details icon" className="card-icon"/>
                    Edit Note
                  </button>
                  <button onClick={() => handleDeleteNotes(oneNote.id)} className="card-btn btn-danger">
                     <img src={deleteBatchIcon} alt="Delete batch icon" className="card-icon"/>
                    Delete Note
                  </button>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BatchNotes;
