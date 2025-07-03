const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  deliveries: [
    {
      date: Date,
      items: String,
      location: String
    }
  ]
});

module.exports = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);
