router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const verification_check = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (verification_check.status === 'approved') {
      res.status(200).json({ message: 'OTP verified' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ message: 'OTP verification failed', error: err });
  }
});
