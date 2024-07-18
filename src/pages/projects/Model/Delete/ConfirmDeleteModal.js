// Modal.js
import React from 'react';
import './DeleteModal.css'; // Ensure to create styles for the modal

function ConfirmDeleteModal({ show, onClose, onConfirm, title, children }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
