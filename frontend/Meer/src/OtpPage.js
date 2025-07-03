import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const phone = localStorage.getItem('volunteerPhone');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/verify-otp', {
        phone,
        otp,
      });

      if (res.status === 200) {
        navigate('/dashboard');
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      alert('OTP verification failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!phone) {
    return <p>⚠️ Phone number not found. Please register again.</p>;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your phone: {phone}</p>

      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px', margin: '10px 0' }}
        />
        <br />
        <button
          type="submit"
          style={{ padding: '10px 20px', fontSize: '16px' }}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}

export default OtpPage;
