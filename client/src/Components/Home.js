import React, { useEffect, useState } from 'react';

import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import OwlCarousel from 'react-owl-carousel';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

const options = {
  items: 1,
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  nav: true,
  dots: true,
};

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
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

  useEffect(() => {
    // Fetch doctors
    fetch(`${API_URL}/api/admin/doctors`)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setDoctors([]));

    // Fetch testimonials
    fetch(`${API_URL}/api/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(() => setTestimonials([]));
  }, []);

  const doctorCarouselOptions = {
    items: 4,
    loop: doctors.length > 4,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: true,
    dots: true,
    margin: 20,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 }
    }
  };

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
      await fetch(`${API_URL}/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
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
      {/* Hero Section */}
      <div
        className="container-fluid header bg-primary p-0 mb-5"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Optional: Add a background video here if you want */}
        <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
          <div className="col-lg-6 p-5">
            <h1 className="display-4 text-white mb-5">Welcome to SmartCare – Your Health, Our Priority</h1>
            <div className="row g-4">
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1">{doctors.length}</h2>
                  <p className="text-light mb-0">Expert Doctors</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1">100+</h2>
                  <p className="text-light mb-0">Medical Staff</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="border-start border-light ps-4">
                  <h2 className="text-white mb-1">5000+</h2>
                  <p className="text-light mb-0">Happy Patients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            {/* OwlCarousel Component */}
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item" style={{ position: 'relative', height: '100%' }}>
                <img className="img-fluid" src={require('../assets/img/carousel-1.jpg')} alt="Cardiology" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <h1 className="display-1 text-white mb-0 text-center" style={{ textShadow: '2px 2px 8px #000' }}>Cardiology</h1>
                </div>
              </div>
              <div className="item" style={{ position: 'relative', height: '100%' }}>
                <img className="img-fluid" src={require('../assets/img/carousel-2.jpg')} alt="Neurology" />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <h1 className="display-1 text-white mb-0 text-center" style={{ textShadow: '2px 2px 8px #000' }}>Neurology</h1>
                </div>
              </div>
              <div className="item">
                <img className="img-fluid" src={require('../assets/img/carousel-3.jpg')} alt="Pulmonary" />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <h1 className="display-1 text-white mb-0 text-center" style={{ textShadow: '2px 2px 8px #000' }}>Pulmonary</h1>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex flex-column">
                <img className="img-fluid rounded w-75 align-self-end" src="img/about-1.jpg" alt="" />
                <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="img/about-2.jpg" alt="" style={{ marginTop: '-25%' }} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <p className="d-inline-block border rounded-pill py-1 px-4">About SmartCare</p>
              <h1 className="mb-4">Trusted Healthcare for You & Your Family</h1>
              <p>At SmartCare, we are committed to providing quality healthcare services with compassion and expertise. Our team of experienced doctors and staff ensure you receive the best care possible, every time.</p>
              <p className="mb-4">We combine advanced medical technology with a patient-centric approach, making your health and comfort our top priority.</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Comprehensive Health Services</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Qualified & Experienced Doctors</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Modern Facilities & Equipment</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>24/7 Availability & Accessibility</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Security and Trust</p>
              <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="/about">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Our Services</p>
            <h1>SmartCare Health Solutions</h1>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-heartbeat text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Cardiology</h4>
                <p className="mb-4">Expert heart care and diagnostics by leading cardiologists.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-x-ray text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Pulmonary</h4>
                <p className="mb-4">Comprehensive lung care and respiratory treatments for all ages.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-brain text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Neurology</h4>
                <p className="mb-4">Advanced neurological care for brain and nervous system disorders.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-wheelchair text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Orthopedics</h4>
                <p className="mb-4">Specialized bone, joint, and muscle care for all ages.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-tooth text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Dental Surgery</h4>
                <p className="mb-4">Complete dental care and oral surgery for a healthy smile.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item bg-light rounded h-100 p-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: '65px', height: '65px' }}>
                  <i className="fa fa-vials text-primary fs-4"></i>
                </div>
                <h4 className="mb-3">Laboratory</h4>
                <p className="mb-4">Accurate and timely lab tests for all your diagnostic needs.</p>
                <a className="btn" href="/service"><i className="fa fa-plus text-primary me-3"></i>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
        <div className="container feature ps-lg-5 ps-3">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="p-lg-5 ps-lg-0">
                <p className="d-inline-block border rounded-pill text-light py-1 px-4">Why SmartCare?</p>
                <h1 className="text-white mb-4">Why Choose SmartCare</h1>
                <p className="text-white mb-4 pb-2">SmartCare is dedicated to delivering exceptional healthcare with a personal touch. Our experienced team, modern facilities, and patient-first approach set us apart.</p>
                <div className="row g-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                        <i className="fa fa-user-md text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="text-white mb-2">Experienced</p>
                        <h5 className="text-white mb-0">Doctors</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                        <i className="fa fa-check text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="text-white mb-2">Quality</p>
                        <h5 className="text-white mb-0">Services</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                        <i className="fa fa-comment-medical text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="text-white mb-2">Personalized</p>
                        <h5 className="text-white mb-0">Consultation</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                        <i className="fa fa-headphones text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="text-white mb-2">24/7</p>
                        <h5 className="text-white mb-0">Support</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: '400px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute img-fluid w-100 h-100" src="img/feature.jpg" style={{ objectFit: 'cover' }} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
            <h1>Meet Our Doctors</h1>
          </div>
          {doctors.length > 4 ? (
            <OwlCarousel className="owl-theme" {...doctorCarouselOptions}>
              {doctors.map((doctor, idx) => (
                <div className="item" key={doctor._id}>
                  <div className="team-item position-relative rounded overflow-hidden">
                    <div className="overflow-hidden">
                      <img
                        className="img-fluid"
                        src={doctor.photo ? `${API_URL}${doctor.photo}` : "/img/team-default.jpg"}
                        alt={doctor.name}
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="team-text bg-light text-center p-4">
                      <h5>{doctor.name}</h5>
                      <p className="text-primary">{doctor.specialization}</p>
                      <div className="team-social text-center">
                        {doctor.facebook && (
                          <a className="btn btn-square" href={doctor.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}
                        {doctor.twitter && (
                          <a className="btn btn-square" href={doctor.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {doctor.instagram && (
                          <a className="btn btn-square" href={doctor.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <div className="row g-4">
              {doctors.length === 0 && (
                <div className="text-center text-muted">No doctors found.</div>
              )}
              {doctors.map((doctor, idx) => (
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 4) * 0.2}s`} key={doctor._id}>
                  <div className="team-item position-relative rounded overflow-hidden">
                    <div className="overflow-hidden">
                      <img
                        className="img-fluid"
                        src={doctor.photo ? `${API_URL}${doctor.photo}` : "/img/team-default.jpg"}
                        alt={doctor.name}
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="team-text bg-light text-center p-4">
                      <h5>{doctor.name}</h5>
                      <p className="text-primary">{doctor.specialization}</p>
                      <div className="team-social text-center">
                        {doctor.facebook && (
                          <a className="btn btn-square" href={doctor.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}
                        {doctor.twitter && (
                          <a className="btn btn-square" href={doctor.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {doctor.instagram && (
                          <a className="btn btn-square" href={doctor.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {doctors.length > 6 && (
          <div className="text-center mt-4">
            <a className="btn btn-primary rounded-pill py-3 px-5" href="/team">
              View All Doctors
            </a>
          </div>
        )}
      </div>

      {/* Appointment Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">Book Appointment</p>
              <h1 className="mb-4">Book Your Appointment at SmartCare</h1>
              <p className="mb-4">Fill out the form to schedule your visit with our expert doctors. We look forward to caring for you!</p>
              <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{ width: '55px', height: '55px' }} >
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
            <p className="d-inline-block border rounded-pill py-1 px-4">Testimonials</p>
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
            {testimonials
              .slice(-3)
              .reverse()
              .map((t) => (
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
                    {t.address && (
                      <div className="mt-2" style={{ color: "#fff", fontSize: "0.95em" }}>
                        <i className="fa fa-map-marker-alt me-2"></i>{t.address}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </OwlCarousel>
        </div>
        {testimonials.length > 3 && (
          <div className="text-center mt-4">
            <a className="btn btn-primary rounded-pill py-3 px-5" href="/testimonial">
              More testimonials
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;