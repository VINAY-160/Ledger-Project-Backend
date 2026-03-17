require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
      const info = await transporter.sendMail({
        from: `"Backend-vinay" <${process.env.EMAIL_USER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });
  
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
// 📧 Registration Email
async function sendRegistrationEmail(userEmail, name) {

    const subject = "Welcome to Backend Project";
  
    const text = `Hello ${name}, your registration was successful. Welcome to Backend Project!`;
  
    const html = `
      <h2>Welcome ${name} 🎉</h2>
      <p>Your account has been successfully created.</p>
      <p>We're happy to have you in <b>Backend Project</b>.</p>
      <br/>
      <p>Best Regards</p>
      <p>Backend-Vinay</p>
    `;
  
    await sendEmail(userEmail, subject, text, html);
  }
  
  module.exports = {
    sendRegistrationEmail
  };