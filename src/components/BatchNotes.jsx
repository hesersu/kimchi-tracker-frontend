import React, { useEffect, useState } from "react";
import "../components/BatchNotes.css";
import { useParams } from "react-router";
import axios from "axios";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { API_URL } from "../../config/apiConfig";
import defaultKimchi from "../assets/kimchi-default.png";
// import addNoteIcon from "../assets/add-batch-icon.svg";
// import viewDetailIcon from "../assets/view-detail-icon.svg";
// import deleteBatchIcon from "../assets/delete-icon.svg";
// import closeButtonIcon from "../assets/xmark-solid.svg";

const BatchNotes = ({showToast}) => {
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
        console.log("Recipe deleted. ", res);
        res.status == 200 ? showToast("Note deleted.", "success") : showToast(res.statusText, "danger")
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
    isUpdated && setIsUpdated(false);
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
          {/* <img src={addNoteIcon} alt="add icon" className="add-note-btn-img" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
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
              showToast={showToast}
            />
            <button className="btn-modal-close" onClick={toggleModalAdd}>
              {/* <img src={closeButtonIcon} alt="close button icon" className="card-icon" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
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
            <EditNoteForm 
              oneNoteId={editNoteId} 
              setIsUpdated={setIsUpdated} 
              toggleModalEdit={toggleModalEdit}
              showToast={showToast}
              />
            <button className="btn-modal-close" onClick={toggleModalEdit}>
              {/* <img src={closeButtonIcon} alt="close button icon" className="card-icon" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
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
                    {/* <img src={viewDetailIcon} alt="View details icon" className="card-icon"/> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    Edit Note
                  </button>
                  <button onClick={() => handleDeleteNotes(oneNote.id)} className="card-btn btn-danger">
                     {/* <img src={deleteBatchIcon} alt="Delete batch icon" className="card-icon"/> */}
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
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
