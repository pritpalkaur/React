import React from 'react';
import './DeleteModal.css'; // Assuming you have a CSS file for styling

function ResponseDeleteModal({ show, onClose, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message.title}</h2>
        <p>{message.body}</p>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ResponseDeleteModal;
