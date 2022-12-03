import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Card from "../UI/Card";

const ViewCustomer = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  // Get Customer by ID
  const getCustomerByID = async () => {
    const response = await fetch(`http://localhost:5000/customers/${id}`);
    const data = await response.json();

    // Format date
    const date = new Date(data.date);
    const getDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const getMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const dateFormat = getDate + "/" + getMonth + "/" + date.getFullYear();

    // update object for the date
    const newObj = { ...data, date: dateFormat };

    // set date
    setData(newObj);
  };

  useEffect(() => {
    getCustomerByID();
  }, []);

  return (
    <Card title="Customer Details">
      <div className="row">
        <div className="col-4">Name:</div>
        <div className="col-4">{data.name}</div>
      </div>
      <div className="row">
        <div className="col-4">Identity Card:</div>
        <div className="col-4">{data.identityCard}</div>
      </div>
      <div className="row">
        <div className="col-4">Email:</div>
        <div className="col-4">{data.email}</div>
      </div>
      <div className="row">
        <div className="col-4">Phone Number:</div>
        <div className="col-4">{data.phoneNumber}</div>
      </div>
      <div className="row">
        <div className="col-4">Member:</div>
        <div className="col-4">{data.member ? "Yes" : "No"}</div>
      </div>
      <div className="row">
        <div className="col-4">Date Register:</div>
        <div className="col-4">{data.date}</div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <Link to={"/"} className="btn btn-primary float-end">
            Go Back
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ViewCustomer;
