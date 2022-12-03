import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalMessage = ({ text, showMessageModal, handleCloseMessageModal }) => {
  return (
    <>
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalMessage;
