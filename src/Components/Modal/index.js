import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = ({ show, handleClose, handlePrintBill, handleSendWhatsAppMessage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The Data has been inserted successfully.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrintBill}>
          Print Bill
        </Button>
        <Button variant="primary" onClick={handleSendWhatsAppMessage}>
          Send WhatsApp Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
