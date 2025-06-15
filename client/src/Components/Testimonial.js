import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../assets/css/style.css"
import "../assets/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/testimonials`)
      .then(res => setTestimonials(res.data))
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Testimonial</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
              <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
              <li className="breadcrumb-item text-primary active" aria-current="page">Testimonial</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Testimonial</p>
            <h1>What Our Patients Say!</h1>
          </div>
          <div className="row g-4">
            {testimonials.length === 0 && (
              <div className="col-12 text-center text-muted">
                <div className="testimonial-text rounded text-center p-4">
                  <p>No testimonials found.</p>
                </div>
              </div>
            )}
            {testimonials.map((t) => (
              <div className="col-lg-4 col-md-6" key={t._id}>
                <div
                  className="testimonial-item text-center mx-auto shadow"
                  style={{
                    maxWidth: '350px',
                    minHeight: '370px',
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 24px rgba(13,110,253,0.10)'
                  }}
                >
                  <img
                    className="img-fluid bg-white rounded-circle p-2 mb-3 border border-4 border-primary"
                    src={t.photo ? `${API_URL}${t.photo}` : "/img/testimonial-default.jpg"}
                    style={{ width: '90px', height: '90px', objectFit: 'cover', backgroundColor: '#0d6efd' }}
                    alt={t.name}
                  />
                  <div
                    className="testimonial-text text-center"
                    style={{
                      fontSize: '1rem',
                      color: '#222',
                      marginBottom: '1rem'
                    }}
                  >
                    <p style={{ minHeight: '80px' }}>{t.message}</p>
                  </div>
                  <h5 className="mb-1" style={{ color: "#0d6efd" }}>{t.name}</h5>
                  <span className="fst-italic" style={{ color: "#888" }}>{t.profession}</span>
                  {t.address && (
                    <div className="mt-2" style={{ color: "#888", fontSize: "0.95em" }}>
                      <i className="fa fa-map-marker-alt me-2"></i>{t.address}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial