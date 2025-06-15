const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  email: String,
  phone: String,
  photo: String,
  facebook: String,   // Add this line
  twitter: String,    // Add this line
  instagram: String   // Add this line
});
module.exports = mongoose.model('Doctor', doctorSchema);