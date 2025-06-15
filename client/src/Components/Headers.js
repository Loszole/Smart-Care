import React, { useEffect, useState } from 'react';
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Headers = () => {
    const [userdata, setUserdata] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });
            setUserdata(response.data.user);
        } catch (error) {
            console.log("error", error);
        }
    };

    // logout
    const logout = () => {
        window.open("http://localhost:6005/logout", "_self");
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            {/* Top Info Bar */}
            <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-7 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-map-marker-alt text-primary me-2"></small>
                            <small>MG Road, Bengaluru, Karnataka, India</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center py-3">
                            <small className="far fa-clock text-primary me-2"></small>
                            <small>Mon - Sat: 09.00 AM - 08.00 PM</small>
                        </div>
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-phone-alt text-primary me-2"></small>
                            <small>+91 98765 43210</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-sm-square rounded-circle bg-white text-primary me-0" href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
                <NavLink to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h1 className="m-0 text-primary">
                        <i className="far fa-hospital me-3"></i>
                        Smart Care
                        <span style={{ fontSize: 16, color: "#888", marginLeft: 8 }}>eHealth Platform</span>
                    </h1>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                        <NavLink to="/about" className="nav-item nav-link">About</NavLink>
                        <NavLink to="/service" className="nav-item nav-link">Services</NavLink>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                                <NavLink to="/feature" className="dropdown-item">Features</NavLink>
                                <NavLink to="/team" className="dropdown-item">Our Doctors</NavLink>
                                <NavLink to="/appointment" className="dropdown-item">Appointment</NavLink>
                                <NavLink to="/testimonial" className="dropdown-item">Testimonials</NavLink>
                                <NavLink to="/404" className="dropdown-item">404 Page</NavLink>
                            </div>
                        </div>
                        <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                    </div>
                    {/* Login/Profile Dropdown */}
                    <div className="nav-item dropdown d-none d-lg-block me-4">
                        {userdata && userdata.email ? (
                            <div className="d-flex align-items-center">
                                <img
                                    src={userdata.photo || "/img/user-default.png"}
                                    alt="profile"
                                    style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8, objectFit: "cover" }}
                                />
                                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" style={{ minWidth: 100 }}>
                                    {userdata.name || "Profile"}
                                </button>
                                <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 180 }}>
                                    <NavLink to="/dashboard" className="dropdown-item mb-2 text-center">Dashboard</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item text-center" onClick={logout}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" style={{ minWidth: 100 }}>
                                    Login
                                </button>
                                <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 180 }}>
                                    <NavLink to="/login" className="dropdown-item mb-2 text-center">Login</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink to="/signup" className="dropdown-item text-center">Sign Up</NavLink>
                                </div>
                            </>
                        )}
                    </div>
                    <a href="/appointment" className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
                        Book Appointment<i className="fa fa-arrow-right ms-3"></i>
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Headers;