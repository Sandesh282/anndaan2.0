require('dotenv').config();
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  try {
    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: 'sms',
      });

    res.status(200).json({ message: 'OTP sent', sid: verification.sid });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const verificationCheck = await client.verify
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

module.exports = router;
