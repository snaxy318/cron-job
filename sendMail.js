//sendMail.js
const express = require('express');
const router = express.Router();
const cron = require('node-cron'); 
const excelService = require('./services/excelCompleteService');
const nodemailer = require('nodemailer');
const path = require('path');
const env = require('dotenv');
const fs = require('fs');

env.config();

// Function to generate Excel and send email
async function sendExcelEmail() {
  try {
    // Generate Excel file for all users
   await excelService.generateTasksExcel();
    console.log('Running sendExcelEmail cron job');

    // Define email options
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const filePath = path.join(__dirname, 'UserTasks.xlsx');
    const fileContent = fs.readFileSync(filePath);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'suryanshtejas.singh2022@vitstudent.ac.in',  // Replace with the recipient email
      subject: 'Weekly Task Report',
      text: 'Please find attached the weekly task report.',
      attachments: [
        {
          filename: 'UserTasks.xlsx',
          content: fileContent,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}

// Schedule the cron job to run every Friday at 7:30 PM
cron.schedule('30 19 * * 5', () => {
  console.log('Running sendExcelEmail cron job');
  sendExcelEmail()
    .then(() => console.log('Excel email sent successfully.'))
    .catch((err) => console.error('Error sending Excel email:', err));
});

// Schedule the cron job to run every Friday at 7:30 PM
cron.schedule('30 19 * * 5', () => {
  sendExcelEmail()
    .then(() => console.log('Excel email sent successfully.'))
    .catch((err) => console.error('Error sending Excel email:', err));
});

module.exports = router;