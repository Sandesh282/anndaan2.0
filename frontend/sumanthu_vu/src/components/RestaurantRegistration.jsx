import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/styles.css'; // Assuming this path is correct relative to your file structure

function RestaurantRegistration() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    email: '',
    phoneNumber: '',
    ownerName: '',
    workingHoursFrom: '',
    workingHoursTo: '',
    password: '',
    confirmPassword: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    if (!otpSent) {
      try {
        const response = await fetch('http://localhost:8081/api/register/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        if (response.ok) {
          setOtpSent(true);
          alert('OTP sent to your email. Please check and enter it below.');
        } else {
          const errorData = await response.json();
          alert(`Error sending OTP: ${errorData.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please check your connection and try again.');
      }
    }
    // If OTP is already sent, this initial submit button is replaced by "Verify OTP" button,
    // so no further action needed here for the main form submission after OTP is sent.
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim() === '' || !formData.email) {
      alert('Please enter the OTP and ensure your email is filled correctly.');
      return;
    }

    // At this point, ideally, you would send the entire formData along with the OTP
    // to a backend endpoint that first verifies OTP and then saves the restaurant data.
    // For example: body: JSON.stringify({ ...formData, otp })
    // However, to keep the backend interaction minimal as per your request for now,
    // we'll stick to the current OTP verification process.
    // The full registration data (name, address, etc.) is not being saved to a persistent backend store here.

    try {
      const response = await fetch('http://localhost:8081/api/register/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, otp: otp }),
      });

      const responseBody = await response.text(); 

      if (response.ok) {
        alert(responseBody || 'OTP verified successfully! Registration process complete.');
        
        // Store minimal data for the dashboard
        // The dashboard expects a token 'otp-verified-restaurant' for this flow
        localStorage.setItem('token', 'otp-verified-restaurant');
        localStorage.setItem('user', JSON.stringify({
            name: formData.restaurantName, // Pass restaurant name
            email: formData.email          // Pass email
        }));

        // Redirect to the restaurant dashboard
        navigate('/restaurant-dashboard'); 

      } else {
        let errorMessage = responseBody;
        try {
            const errorData = JSON.parse(responseBody);
            errorMessage = errorData.message || responseBody;
        } catch (_parseError) {
            // Keep responseBody as is if it's not JSON
        }
        alert(`Error verifying OTP: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please check your connection and try again.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="container">
          <h1>Save and Serve Leftover Food</h1>
          <p>Your efforts can bring hope to many. Let's make a difference together!</p>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="form-section">
            <div className="form-wrapper">
              <h2>Registration Form</h2>
              <form id="registrationForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="restaurantName">Restaurant Name:</label>
                  <input 
                    type="text" 
                    placeholder="Hotel Name" 
                    id="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input 
                    type="text" 
                    placeholder="Address" 
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    placeholder="Enter Email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required // Email is crucial for OTP
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Mobile Number:</label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    placeholder="Enter Mobile Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ownerName">Owner Name:</label>
                  <input 
                    type="text" 
                    id="ownerName" 
                    placeholder="Owner's name"
                    value={formData.ownerName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workingHoursFrom">Working Hours - From:</label>
                  <input 
                    type="time" 
                    id="workingHoursFrom"
                    value={formData.workingHoursFrom}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workingHoursTo">To:</label>
                  <input 
                    type="time" 
                    id="workingHoursTo"
                    value={formData.workingHoursTo}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Create a password:</label>
                  <input 
                    type="password" 
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm password:</label>
                  <input 
                    type="password" 
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                </div>

                {!otpSent ? (
                  <button type="submit" className="submit-btn">Register and Send OTP</button>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="otp">Enter OTP:</label>
                      <input
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                      />
                    </div>
                    <button type="button" onClick={handleOtpSubmit} className="submit-btn">Verify OTP & Complete Registration</button>
                  </>
                )}
              </form>
            </div>
            
            <div className="slogans">
              <h3>"Reviving Leftovers, Reviving Lives!"</h3>
              {/* Ensure projectimg1.jpg is in the public folder or correctly pathed */}
              <img src="/projectimg1.jpg" alt="End Food Waste!" style={{ maxWidth: '100%', height: 'auto' }} />
              <h3>"Together, we can make a change!"</h3>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2024 Save and Serve Leftover Food | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default RestaurantRegistration;