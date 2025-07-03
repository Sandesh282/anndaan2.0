require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const volunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  email: String,
  phone: String,
  availability: String,
  hours: String,
  password: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

app.post('/register', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).send('✅ Volunteer registered successfully!');
  } catch (error) {
    console.error(error);
    res.status(400).send('❌ Failed to register volunteer.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const otpRoutes = require('./routes/otp');
app.use('/api', otpRoutes);

const volunteerRoutes = require('./routes/volunteer');
app.use('/api', volunteerRoutes);
 
