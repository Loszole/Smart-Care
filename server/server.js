const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const User = require('./models/User');
const Contact = require('./models/Contact');
const Doctor = require('./models/Doctor');
const Inquiry = require('./models/Inquiry');
const Testimonial = require('./models/testimonialSchema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/clinic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// Medicine order model
const MedicineOrder = mongoose.model('MedicineOrder', new mongoose.Schema({
  name: String,
  quantity: Number,
  orderedAt: { type: Date, default: Date.now }
}));

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact Us route
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ message: 'Contact message submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Inquiry route (Appointment)
app.post('/api/inquiry', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.json({ message: 'Inquiry submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Medicine order route
app.post('/api/medicine', async (req, res) => {
  try {
    const order = new MedicineOrder(req.body);
    await order.save();
    res.json({ message: 'Medicine ordered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add doctor with photo upload and social links
app.post('/api/admin/doctors', upload.single('photo'), async (req, res) => {
  try {
    const { name, specialization, email, phone, facebook, twitter, instagram } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : "";
    const doctor = new Doctor({ name, specialization, email, phone, photo, facebook, twitter, instagram });
    await doctor.save();
    res.json({ message: 'Doctor added', doctor });
  } catch (err) {
    console.error("Doctor POST error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all doctors
app.get('/api/admin/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all inquiries
app.get('/api/admin/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact messages
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add testimonial (admin)
app.post('/api/admin/testimonials', upload.single('photo'), async (req, res) => {
  try {
    const { name, profession, message } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : "";
    const testimonial = new Testimonial({ name, profession, message, photo });
    await testimonial.save();
    res.json({ message: 'Testimonial added', testimonial });
  } catch (err) {
    console.error("Testimonial POST error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all medicine orders
app.get('/api/admin/medicines', async (req, res) => {
  try {
    const medicines = await MedicineOrder.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = 6005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
