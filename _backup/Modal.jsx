import React, { useState } from "react";
import "../components/Modal.css";

const Modal = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  return (
    <>
      <button className="btn-modal-open" onClick={toggleModal}>
        Add Note
      </button>

      {modal && (
        <div className="modal-container">
          <div className="modal-overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal!</h2>
            <p>This is a form</p>
            <button className="btn-modal-close" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
