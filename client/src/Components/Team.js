import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

const Team = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/admin/doctors`)
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, []);

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Doctors</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb text-uppercase mb-0">
              <li className="breadcrumb-item">
                <a className="text-white" href="#">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-white" href="#">
                  Pages
                </a>
              </li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                Doctors
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
            <h1>Our Experience Doctors</h1>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Team;