import React, { useState, useEffect } from 'react'
import axios from "axios";
import "../assets/css/style.css"
import "../assets/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    doctor: '',
    date: '',
    time: '',
    description: ''
  });
  const [status, setStatus] = useState("");
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin/doctors`)
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/inquiry`, formData);
      setStatus("Your appointment has been booked successfully!");
      setFormData({
        name: '',
        email: '',
        mobile: '',
        doctor: '',
        date: '',
        time: '',
        description: ''
      });
    } catch {
      setStatus("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Book Appointment</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
              <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Appointment</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">Book Appointment</p>
              <h1 className="mb-4">Schedule Your Visit at SmartCare</h1>
              <p className="mb-4">
                Fill out the form to book your appointment with our expert doctors. We are committed to providing you with the best healthcare experience.
              </p>
              <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                  <i className="fa fa-phone-alt text-primary"></i>
                </div>
                <div className="ms-4">
                  <p className="mb-2">Call Us</p>
                  <h5 className="mb-0">+91 98765 43210</h5>
                </div>
              </div>
              <div className="bg-light rounded d-flex align-items-center p-5">
                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }}>
                  <i className="fa fa-envelope-open text-primary"></i>
                </div>
                <div className="ms-4">
                  <p className="mb-2">Email Us</p>
                  <h5 className="mb-0">info@smartcare.in</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="email"
                        className="form-control border-0"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select border-0"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      >
                        <option value="">Choose Doctor</option>
                        {doctors.map((doc) => (
                          <option key={doc._id} value={doc.name}>
                            {doc.name} ({doc.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="date"
                        className="form-control border-0"
                        placeholder="Choose Date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        type="time"
                        className="form-control border-0"
                        placeholder="Choose Time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        style={{ height: '55px' }}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control border-0"
                        rows="5"
                        placeholder="Describe your problem"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Book Appointment</button>
                    </div>
                  </div>
                  {status && (
                    <div className="alert alert-info mt-3">{status}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Appointment