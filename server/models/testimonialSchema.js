const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
  name: String,
  profession: String,
  message: String,
  photo: String // store image path or URL
});
module.exports = mongoose.model('Testimonial', testimonialSchema);