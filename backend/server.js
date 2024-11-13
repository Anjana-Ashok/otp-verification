require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: '5m', default: Date.now }
});
const Otp = mongoose.model('Otp', otpSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP:', error.message);
        console.error('Full error object:', error);
        return res.status(500).send('Error sending OTP');
      }
      res.status(200).send('OTP sent');
    });
  } catch (err) {
    console.error('Error during OTP creation or email sending:', err);
    res.status(500).send('Error processing request');
  }
});

app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  try {
    const otpEntry = await Otp.findOneAndDelete({ otp });

    if (otpEntry) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).send('Error processing request');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
