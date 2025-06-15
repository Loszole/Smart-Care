import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

function About() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/doctors`)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);
  return (
    <div>

    <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol className="breadcrumb text-uppercase mb-0">
                    <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
                    <li className="breadcrumb-item"><a className="text-white" href="#">Pages</a></li>
                    <li className="breadcrumb-item text-primary active" aria-current="page">About</li>
                </ol>
            </nav>
        </div>
    </div>
{/* About Section */}
      <div className="container-xxl py-5"> 
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex flex-column">
                <img className="img-fluid rounded w-75 align-self-end" src="img/about-1.jpg" alt=""/>
                <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="img/about-2.jpg" alt="" style={{marginTop: -25}} />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <p className="d-inline-block border rounded-pill py-1 px-4">About SmartCare</p>
              <h1 className="mb-4">Your Trusted Partner in Health & Wellness</h1>
              <p>SmartCare is dedicated to providing high-quality, compassionate healthcare for you and your family. Our mission is to combine advanced medical expertise with a patient-first approach, ensuring you receive the best care at every step.</p>
              <p className="mb-4">With a team of experienced doctors, modern facilities, and a commitment to excellence, SmartCare is your one-stop destination for all your healthcare needs. We believe in building lasting relationships with our patients, based on trust, transparency, and care.</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Comprehensive Health Services</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Qualified & Experienced Doctors</p>
              <p><i className="far fa-check-circle text-primary me-3"></i>Modern Facilities & Technology</p>
              <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with left padding */}
      <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
        <div className="container feature ps-lg-5 ps-3">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
              <div className="p-lg-5 ps-lg-0">
                <p className="d-inline-block border rounded-pill text-light py-1 px-4">Features</p>
                <h1 className="text-white mb-4">Why Choose SmartCare</h1>
                <p className="text-white mb-4 pb-2">At SmartCare, we are committed to delivering exceptional healthcare with a personal touch. Our experienced team, modern infrastructure, and patient-centric approach make us the preferred choice for families across India.</p>
                <div className="row g-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
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
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
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
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
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
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{width: '55px', height: '55px'}}>
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
            <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{minHeight: '400px'}}>
              <div className="position-relative h-100">
                <img className="position-absolute img-fluid w-100 h-100" src="img/feature.jpg" style={{objectFit: 'cover'}} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section (dynamic) */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
            <h1>Meet Our Expert Doctors</h1>
          </div>
          <div className="row g-4">
            {doctors.length === 0 && (
              <div className="text-center text-muted">No doctors found.</div>
            )}
            {doctors.slice(0, 4).map((doctor, idx) => (
              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 + (idx % 4) * 0.2}s`} key={doctor._id}>
                <div className="team-item position-relative rounded overflow-hidden">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src={doctor.photo ? `${API_URL}${doctor.photo}` : "/img/team-default.jpg"} alt={doctor.name}/>
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
          {doctors.length > 4 && (
            <div className="text-center mt-4">
              <a className="btn btn-primary rounded-pill py-3 px-5" href="/team">
                View All Doctors
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default About