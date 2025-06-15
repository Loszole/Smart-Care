import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import axios from 'axios';
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

function Service() {
  // Appointment state
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
  const [testimonials, setTestimonials] = useState([]);

  // Fetch doctors and testimonials
  useEffect(() => {
    axios.get(`${API_URL}/api/admin/doctors`)
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));
    axios.get(`${API_URL}/api/testimonials`)
      .then(res => setTestimonials(res.data))
      .catch(() => setTestimonials([]));
  }, []);

  // Appointment handlers
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
    <div>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Services</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
              <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Services</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
            <h1>Health Care Solutions</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-heartbeat text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Cardiology</h4>
                <p className="mb-4">Expert heart care and diagnostics by leading cardiologists.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-x-ray text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Pulmonary</h4>
                <p className="mb-4">Comprehensive lung care and respiratory treatments for all ages.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-brain text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Neurology</h4>
                <p className="mb-4">Advanced neurological care for brain and nervous system disorders.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-wheelchair text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Orthopedics</h4>
                <p className="mb-4">Specialized bone, joint, and muscle care for all ages.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-tooth text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Dental Surgery</h4>
                <p className="mb-4">Complete dental care and oral surgery for a healthy smile.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-vials text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Laboratory</h4>
                <p className="mb-4">Accurate and timely lab tests for all your diagnostic needs.</p>
                <a className="btn" href=""><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">Book Appointment</p>
              <h1 className="mb-4">Book Your Appointment</h1>
              <p className="mb-4">
                Fill out the form to schedule your visit with our expert doctors. We look forward to caring for you!
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

      {/* Testimonials Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Testimonial</p>
            <h1>What Our Patients Say</h1>
          </div>
          <OwlCarousel
            className="owl-theme"
            items={1}
            loop
            autoplay
            autoplayTimeout={3000}
            nav
            dots
            margin={10}
          >
            {testimonials.length === 0 && (
              <div className="testimonial-item text-center mx-auto" style={{ maxWidth: '350px' }}>
                <div className="testimonial-text rounded text-center p-4">
                  <p>No testimonials found.</p>
                </div>
              </div>
            )}
            {testimonials.map((t) => (
              <div className="testimonial-item text-center mx-auto" style={{ maxWidth: '350px' }} key={t._id}>
                <img
  className="img-fluid bg-white rounded-circle p-2 mx-auto mb-4 border border-4 border-primary"
  src={t.photo ? `${API_URL}${t.photo}` : "/img/testimonial-default.jpg"}
  style={{ width: '100px', height: '100px', backgroundColor: '#0d6efd' }}
  alt={t.name}
/>
                <div
                  className="testimonial-text rounded text-center p-4"
                  style={{
                    fontSize: '1rem',
                    background: '#0d6efd',
                    color: '#fff',
                    boxShadow: '0 2px 16px rgba(13,110,253,0.08)'
                  }}
                >
                  <p>{t.message}</p>
                  <h5 className="mb-1" style={{ color: "#fff" }}>{t.name}</h5>
                  <span className="fst-italic">{t.profession}</span>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}

export default Service;