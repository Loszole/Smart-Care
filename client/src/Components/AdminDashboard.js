import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6005";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: ""
  });
  const [doctorPhoto, setDoctorPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Testimonial states
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    profession: "",
    message: ""
  });
  const [testimonialPhoto, setTestimonialPhoto] = useState(null);
  const [testimonialPhotoPreview, setTestimonialPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          usersRes,
          inquiriesRes,
          contactsRes,
          medicinesRes,
          doctorsRes,
          testimonialsRes
        ] = await Promise.all([
          axios.get(`${API_URL}/api/admin/users`),
          axios.get(`${API_URL}/api/admin/inquiries`),
          axios.get(`${API_URL}/api/admin/contacts`),
          axios.get(`${API_URL}/api/admin/medicines`),
          axios.get(`${API_URL}/api/admin/doctors`),
          axios.get(`${API_URL}/api/testimonials`)
        ]);
        setUsers(usersRes.data);
        setInquiries(inquiriesRes.data);
        setContacts(contactsRes.data);
        setMedicines(medicinesRes.data);
        setDoctors(doctorsRes.data);
        setTestimonials(testimonialsRes.data);
        setFetchError(null);
      } catch (error) {
        setUsers([]);
        setInquiries([]);
        setContacts([]);
        setMedicines([]);
        setDoctors([]);
        setTestimonials([]);
        setFetchError("Failed to fetch admin data.");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Doctor handlers
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setDoctorPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleDoctorChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", doctorForm.name);
      formData.append("specialization", doctorForm.specialization);
      formData.append("email", doctorForm.email);
      formData.append("phone", doctorForm.phone);
      formData.append("facebook", doctorForm.facebook || "");
      formData.append("twitter", doctorForm.twitter || "");
      formData.append("instagram", doctorForm.instagram || "");
      if (doctorPhoto) formData.append("photo", doctorPhoto);

      await axios.post(`${API_URL}/api/admin/doctors`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Fetch updated doctors list after adding
      const updated = await axios.get(`${API_URL}/api/admin/doctors`);
      setDoctors(updated.data);
      setDoctorForm({ name: "", specialization: "", email: "", phone: "", facebook: "", twitter: "", instagram: "" });
      setDoctorPhoto(null);
      setPhotoPreview(null);
      setFetchError(null);
    } catch {
      alert("Failed to add doctor");
    }
  };

  // Testimonial handlers
  const handleTestimonialChange = (e) => {
    setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });
  };

  const handleTestimonialPhotoChange = (e) => {
    const file = e.target.files[0];
    setTestimonialPhoto(file);
    setTestimonialPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", testimonialForm.name);
      formData.append("profession", testimonialForm.profession);
      formData.append("message", testimonialForm.message);
      if (testimonialPhoto) formData.append("photo", testimonialPhoto);

      await axios.post(`${API_URL}/api/admin/testimonials`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Fetch updated testimonials list after adding
      const updated = await axios.get(`${API_URL}/api/testimonials`);
      setTestimonials(updated.data);
      setTestimonialForm({ name: "", profession: "", message: "" });
      setTestimonialPhoto(null);
      setTestimonialPhotoPreview(null);
      setFetchError(null);
    } catch {
      alert("Failed to add testimonial");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <h4>Users</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Inquiries</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                  <td>{i.mobile}</td>
                  <td>{i.doctor}</td>
                  <td>{i.date}</td>
                  <td>{i.time}</td>
                  <td>{i.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Contact Messages</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject}</td>
                  <td>{c.message}</td>
                </tr>
              ))}
            </tbody>
          </table>

                   
          <h4>Add Doctor</h4>
          <form
            onSubmit={handleDoctorSubmit}
            className="mb-4"
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={doctorForm.name}
                  onChange={handleDoctorChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  placeholder="Specialization"
                  value={doctorForm.specialization}
                  onChange={handleDoctorChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={doctorForm.email}
                  onChange={handleDoctorChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone"
                  value={doctorForm.phone}
                  onChange={handleDoctorChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  name="facebook"
                  placeholder="Facebook URL"
                  value={doctorForm.facebook || ""}
                  onChange={handleDoctorChange}
                />
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  name="twitter"
                  placeholder="X (Twitter) URL"
                  value={doctorForm.twitter || ""}
                  onChange={handleDoctorChange}
                />
              </div>
              <div className="col">
                <input
                  type="url"
                  className="form-control"
                  name="instagram"
                  placeholder="Instagram URL"
                  value={doctorForm.instagram || ""}
                  onChange={handleDoctorChange}
                />
              </div>
              <div className="col">
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-primary" type="submit">
                  Add Doctor
                </button>
              </div>
            </div>
            {photoPreview && (
              <div className="mt-2">
                <strong>Photo Preview:</strong>
                <br />
                <img
                  src={photoPreview}
                  alt="Doctor Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </div>
            )}
          </form>
                  
          <h4>Doctors List</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Facebook</th>
                <th>X (Twitter)</th>
                <th>Instagram</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td style={{ width: 120, height: 120, verticalAlign: "middle" }}>
                    {d.photo && (
                      <img
                        src={`${API_URL}${d.photo}`}
                        alt={d.name}
                        style={{
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />
                    )}
                  </td>
                  <td>{d.name}</td>
                  <td>{d.specialization}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>{d.facebook ? (
                      <a href={d.facebook} target="_blank" rel="noopener noreferrer">
                        facebook
                      </a>
                    ) : (
                      "-"
                    ) }</td>
                  <td>
                    {d.twitter ? (
                      <a href={d.twitter} target="_blank" rel="noopener noreferrer">
                        X
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {d.instagram ? (
                      <a href={d.instagram} target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Add Testimonial</h4>
          <form
            onSubmit={handleTestimonialSubmit}
            className="mb-4"
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={testimonialForm.name}
                  onChange={handleTestimonialChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="profession"
                  placeholder="Profession"
                  value={testimonialForm.profession}
                  onChange={handleTestimonialChange}
                  required
                />
              </div>
              <div className="col">
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Message"
                  value={testimonialForm.message}
                  onChange={handleTestimonialChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  accept="image/*"
                  onChange={handleTestimonialPhotoChange}
                  required
                />
              </div>
              <div className="col">
                <button className="btn btn-primary" type="submit">
                  Add Testimonial
                </button>
              </div>
            </div>
            {testimonialPhotoPreview && (
              <div className="mt-2">
                <strong>Photo Preview:</strong>
                <br />
                <img
                  src={testimonialPhotoPreview}
                  alt="Testimonial Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </div>
            )}
          </form>

          <h4>Testimonials List</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Profession</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td style={{ width: 120, height: 120, verticalAlign: "middle" }}>
                    {t.photo && (
                      <img
                        src={`${API_URL}${t.photo}`}
                        alt={t.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "50%"
                        }}
                      />
                    )}
                  </td>
                  <td>{t.name}</td>
                  <td>{t.profession}</td>
                  <td>{t.message}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Medicine Orders</h4>
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id}>
                  <td>{m.name}</td>
                  <td>{m.quantity}</td>
                  <td>{new Date(m.orderedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;