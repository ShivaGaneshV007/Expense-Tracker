// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (to, otp, purpose) => {
  const subject = purpose === 'login' ? 'Login OTP Verification' : 'Password Reset OTP';
  const text = `Your OTP for ${purpose} is: ${otp}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent to', to);
    return true;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    return false;
  }
};

module.exports = { sendOTP };
