import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    availability: '',
    hours: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post('http://localhost:5000/register', formData);

      localStorage.setItem('volunteerPhone', formData.phone);

      await axios.post('http://localhost:5000/api/send-otp', {
        phone: formData.phone,
      });

      alert('OTP sent successfully!');
      navigate('/otp');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="holder">
      <h1>Volunteer Registration</h1>
      <img
        src="https://foundersguide.com/wp-content/uploads/2019/09/delivery.jpg"
        alt="Volunteering"
        style={{ width: '100%', height: '400px' }}
      />
      <p>Join us to help fight hunger in the society!</p>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstName" type="text" onChange={handleChange} required />

        <label>Last Name</label>
        <input name="lastName" type="text" onChange={handleChange} required />

        <label>Date Of Birth</label>
        <input name="dob" type="date" onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" onChange={handleChange} required />

        <label>Phone Number</label>
        <input name="phone" type="tel" onChange={handleChange} required />

        <label>Availability</label>
        <select name="availability" onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
          <option value="anytime">Anytime</option>
        </select>

        <label>Working Hours</label>
        <select name="hours" onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>

        <label>Create A Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register Now</button>
      </form>
    </div>
  );
}

export default App;
