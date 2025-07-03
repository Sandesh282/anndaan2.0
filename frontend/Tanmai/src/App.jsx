import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    foodChoice: '',
    quantity: '',
    message: ''
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    console.log('Generated OTP:', newOtp);
    return newOtp;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.foodChoice || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate and show OTP
    generateOtp();
    setShowOtpModal(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setTimeout(() => {
        setShowOtpModal(false);
        setShowSummary(true);
      }, 1500);
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp('');
    }
  };

  const getFoodChoiceText = (value) => {
    const choices = {
      'canned-goods': 'Canned Goods',
      'fresh-produce': 'Fresh Produce',
      'cooked-meals': 'Cooked Meals',
      'dry-goods': 'Dry Goods (Rice, Beans, etc.)',
      'ready-to-eat': 'Ready to Eat Meals'
    };
    return choices[value] || value;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      foodChoice: '',
      quantity: '',
      message: ''
    });
    setOtp('');
    setGeneratedOtp('');
    setOtpVerified(false);
    setShowSummary(false);
    setShowOtpModal(false);
  };

  if (showSummary) {
    return (
      <div>
        <header>
          <div className="container">
            <h1>Application Submitted Successfully!</h1>
            <p>Thank you for your application. Here's a summary of your request.</p>
          </div>
        </header>

        <main>
          {/* <div className="container"> */}
            <div className="summary-section">
              <div className="summary-wrapper">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h2>Application Summary</h2>
                <div className="summary-details">
                  <div className="summary-item">
                    <strong>Full Name:</strong> {formData.name}
                  </div>
                  <div className="summary-item">
                    <strong>Phone Number:</strong> {formData.phone}
                  </div>
                  <div className="summary-item">
                    <strong>Address:</strong> {formData.address}
                  </div>
                  <div className="summary-item">
                    <strong>Preferred Food Type:</strong> {getFoodChoiceText(formData.foodChoice)}
                  </div>
                  <div className="summary-item">
                    <strong>Number of People:</strong> {formData.quantity}
                  </div>
                  {formData.message && (
                    <div className="summary-item">
                      <strong>Additional Information:</strong> {formData.message}
                    </div>
                  )}
                </div>
                <button onClick={resetForm} className="submit-btn">
                  Submit Another Application
                </button>
              </div>
            </div>
          {/* </div> */}
        </main>

        <footer>
          <div className="container">
            <p>&copy; 2024 Help the Homeless | All rights reserved</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div className="container">
          <h1>Get Food Assistance</h1>
          <p>No one should go hungry. We are here to help.</p>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="form-section">
            <div className="slogans">
              <h3>"No one should sleep hungry."</h3>
              <h3>"Together, we can end hunger."</h3>
            </div>
            <div className="form-wrapper">
              <h2>Food Assistance Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name"><i className="fas fa-user"></i> Full Name:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone"><i className="fas fa-phone"></i> Phone Number:</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address"><i className="fas fa-map-marker-alt"></i> Address or Landmark:</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address or nearby landmark" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="foodChoice"><i className="fas fa-utensils"></i> Preferred Type of Food:</label>
                  <select 
                    id="foodChoice" 
                    name="foodChoice" 
                    value={formData.foodChoice}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select food type</option>
                    <option value="canned-goods">Canned Goods</option>
                    <option value="fresh-produce">Fresh Produce</option>
                    <option value="cooked-meals">Cooked Meals</option>
                    <option value="dry-goods">Dry Goods (Rice, Beans, etc.)</option>
                    <option value="ready-to-eat">Ready to Eat Meals</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity"><i className="fas fa-users"></i> Number of People to Feed:</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter the number of people" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message"><i className="fas fa-comments"></i> Additional Information (Optional):</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Add any special requests or dietary needs"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Submit Application</button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 Help the Homeless | All rights reserved</p>
        </div>
      </footer>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>OTP Verification</h3>
            <p>An OTP has been sent to your mobile number: {formData.phone}</p>
            <p className="otp-info">Check the browser console for the OTP</p>
            
            {otpVerified ? (
              <div className="verification-success">
                <i className="fas fa-check-circle success-icon-large"></i>
                <p>OTP Verified Successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input 
                    type="text" 
                    id="otp" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP" 
                    maxLength="6"
                    required 
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="verify-btn">Verify OTP</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowOtpModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;