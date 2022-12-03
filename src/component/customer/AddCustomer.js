import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import ModalMessage from "../UI/ModalMessage";

const AddCustomer = () => {
  const refName = useRef();
  const refIdentityCard = useRef();
  const refEmail = useRef();
  const refPhoneNumber = useRef();
  const refMember = useRef();
  const refForm = useRef();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalText, setModalText] = useState(false);

  const navigate = useNavigate();

  const submit_customer = (e) => {
    e.preventDefault();

    let date = new Date().toISOString();

    let newCustomer = {
      name: refName.current.value,
      identityCard: refIdentityCard.current.value,
      email: refEmail.current.value,
      phoneNumber: refPhoneNumber.current.value,
      member: refMember.current.checked,
      date: date,
    };

    fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setShowMessageModal(true);
        setModalText("Create Failed.");
      });
  };

  // Modal Message Function
  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <Card title="Add Customer">
      <form onSubmit={submit_customer} id="customerForm" ref={refForm}>
        <div className="form-group mb-3">
          <label className="form-label">Name:</label>
          <input type="text" ref={refName} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Identity Card:</label>
          <input
            type="number"
            ref={refIdentityCard}
            className="form-control"
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input type="email" ref={refEmail} className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Phone Number:</label>
          <input
            type="number"
            ref={refPhoneNumber}
            className="form-control"
            onWheel={(event) => event.currentTarget.blur()}
          />
        </div>
        <div className="form-check mb-5">
          <input className="form-check-input" type="checkbox" ref={refMember} />
          <label className="form-check-label">Member</label>
        </div>

        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>

      <ModalMessage
        text={modalText}
        showMessageModal={showMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
      />
    </Card>
  );
};

export default AddCustomer;
