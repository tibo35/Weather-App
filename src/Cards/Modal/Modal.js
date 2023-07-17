import React from "react";
import style from "../Modal/Modal.css";

function MyModal({ showModal, setShowModal }) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={() => setShowModal(false)}>Close</button>
        <h2>This is a modal</h2>
        {/* Put the content of your modal here */}
      </div>
    </div>
  );
}

export default MyModal;
