const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
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

module.exports = router;
