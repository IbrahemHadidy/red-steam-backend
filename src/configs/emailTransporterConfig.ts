import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure your email transporter (e.g., using SMTP)
const transporter = nodemailer.createTransport({
  // Your mail server configuration
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
