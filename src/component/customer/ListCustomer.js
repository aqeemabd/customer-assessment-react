import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaRegEdit } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "../UI/Card";
import ModalMessage from "../UI/ModalMessage";

const ListCustomer = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalText, setModalText] = useState(false);

  const [customerID, setCustomerID] = useState();
  const [name, setName] = useState();
  const [identityCard, setIdentityCard] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [member, setMember] = useState(false);

  // Get Customer
  const getData = async () => {
    const response = await fetch(`http://localhost:5000/customers`);
    const data = await response.json();

    return data;
  };

  // Delete Customer
  const deleteCustomer = async (id) => {
    await fetch(`http://localhost:5000/customers/${id}`, { method: "DELETE" })
      .then((res) => {
        setShowMessageModal(true);
        setModalText("Delete succeed.");
      })
      .catch((err) => {
        setShowMessageModal(true);
        setModalText("Delete failed.");
      });
    let filter = data.filter((x) => x.id !== id);
    setData(filter);
  };

  // Update Customer
  const updateCustomer = (e) => {
    e.preventDefault();

    const find_customer = data.find((customer) => customer.id === customerID);

    const newData = {
      ...find_customer,
      name: name,
      identityCard: identityCard,
      email: email,
      phoneNumber: phoneNumber,
      member: member,
    };

    fetch(`http://localhost:5000/customers/${customerID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => {
        setShowModal(false);
        setShowMessageModal(true);
        setModalText("Update succeed.");
        setData(
          data.map((customer) =>
            customer.id === customerID ? newData : customer
          )
        );
      })
      .catch((err) => {
        setShowMessageModal(true);
        setModalText("Update failed.");
      });
  };

  // Edit Modal Function
  const handleOpenModal = (id) => {
    let find = data.find((x) => x.id === id);
    if (find !== undefined) {
      setCustomerID(find.id);

      if (find.name) {
        setName(find.name);
      }
      if (find.identityCard) {
        setIdentityCard(find.identityCard);
      }
      if (find.email) {
        setEmail(find.email);
      }
      if (find.phoneNumber) {
        setPhoneNumber(find.phoneNumber);
      }
      if (find.member) {
        setMember(find.member);
      }
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Modal Message Function
  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    const getCustomers = async () => {
      const customers = await getData();
      setData(customers);
    };
    getCustomers();
  }, []);

  // event.currentTarget.blur() is to prevent input type number from scrolling to increase the number

  return (
    <Card title="Customer List">
      <Link to={"/add-customer"} className="btn btn-primary float-end">
        + Add Customer
      </Link>
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/view-customer/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td className="text-center">
                    <FaTimes
                      style={{ color: "#393939", cursor: "pointer" }}
                      onClick={() => deleteCustomer(item.id)}
                    />
                    <FaRegEdit
                      style={{
                        color: "#393939",
                        cursor: "pointer",
                        marginLeft: "10px",
                        marginBottom: "3px",
                      }}
                      onClick={() => handleOpenModal(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={4}>
                  Data is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <form onSubmit={updateCustomer}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Identity Card:</label>
              <input
                type="number"
                className="form-control"
                value={identityCard}
                onChange={(e) => setIdentityCard(e.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number:</label>
              <input
                type="number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="form-check mb-5">
              <input
                className="form-check-input"
                type="checkbox"
                checked={member}
                onChange={(e) => setMember(e.currentTarget.checked)}
              />
              <label className="form-check-label">Member</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button type="submit" variant="primary" value="Submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <ModalMessage
        text={modalText}
        showMessageModal={showMessageModal}
        handleCloseMessageModal={handleCloseMessageModal}
      />
    </Card>
  );
};

export default ListCustomer;
