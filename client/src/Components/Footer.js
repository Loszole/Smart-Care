import React, { useEffect, useState } from 'react';
import "../assets/css/style.css"
import "../assets/css/bootstrap.min.css"
import { NavLink } from "react-router-dom";
import axios from "axios";

const Footer = () => {
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
            <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Address</h5>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>MG Road, Bengaluru, Karnataka, India</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+91 98765 43210</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@SmartCare.in</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Services</h5>
                            <a className="btn btn-link" href="/team">Cardiology</a>
                            <a className="btn btn-link" href="/team">Pulmonary</a>
                            <a className="btn btn-link" href="/team">Neurology</a>
                            <a className="btn btn-link" href="/team">Orthopedics</a>
                            <a className="btn btn-link" href="/team">Laboratory</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Quick Links</h5>
                            <a className="btn btn-link" href="/about">About Us</a>
                            <a className="btn btn-link" href="/contact">Contact Us</a>
                            <a className="btn btn-link" href="/services">Our Services</a>
                            <a className="btn btn-link" href="/404">Terms & Condition</a>
                            <a className="btn btn-link" href="/404">Support</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">Newsletter</h5>
                            <p>Subscribe to our newsletter for health tips and updates.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                                <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a className="border-bottom" href="#">SmartCare</a>, All Rights Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                            Designed By <a className="border-bottom" href="#">zoloskey</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;