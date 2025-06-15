import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  // Appointment state
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    mobile: "",
    doctor: "",
    date: "",
    time: "",
    description: ""
  });
  // Medicine order state
  const [medicine, setMedicine] = useState({
    name: "",
    quantity: ""
  });
  const [status, setStatus] = useState("");

  // Handle appointment booking
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6005/api/inquiry", appointment);
      setStatus("Appointment booked!");
      setAppointment({
        name: "",
        email: "",
        mobile: "",
        doctor: "",
        date: "",
        time: "",
        description: ""
      });
    } catch {
      setStatus("Failed to book appointment.");
    }
  };

  // Handle medicine order
  const handleMedicine = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6005/api/medicine", medicine);
      setStatus("Medicine ordered!");
      setMedicine({ name: "", quantity: "" });
    } catch {
      setStatus("Failed to order medicine.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard</h2>
      {status && <div className="alert alert-info">{status}</div>}

      <div className="row">
        <div className="col-md-6">
          <h4>Book Appointment</h4>
          <form onSubmit={handleAppointment}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={appointment.name}
                onChange={e => setAppointment({ ...appointment, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={appointment.email}
                onChange={e => setAppointment({ ...appointment, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={appointment.mobile}
                onChange={e => setAppointment({ ...appointment, mobile: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Doctor</label>
              <input
                type="text"
                className="form-control"
                name="doctor"
                value={appointment.doctor}
                onChange={e => setAppointment({ ...appointment, doctor: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={appointment.date}
                onChange={e => setAppointment({ ...appointment, date: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Time</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={appointment.time}
                onChange={e => setAppointment({ ...appointment, time: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={appointment.description}
                onChange={e => setAppointment({ ...appointment, description: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" type="submit">Book Appointment</button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>Order Medicine</h4>
          <form onSubmit={handleMedicine}>
            <div className="mb-3">
              <label>Medicine Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={medicine.name}
                onChange={e => setMedicine({ ...medicine, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={medicine.quantity}
                onChange={e => setMedicine({ ...medicine, quantity: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-success" type="submit">Order Medicine</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;