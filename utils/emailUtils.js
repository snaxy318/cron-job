const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const userService = require('../services/userService');
const env = require('dotenv');

env.config();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS,
  },
});

async function sendEmails() {
  try {
    // Directory path for saved Excel files
    const excelDir = path.join(__dirname, '..', 'excel');

    // Read all files in the directory
    const files = fs.readdirSync(excelDir);

    // Iterate through each file
    for (const file of files) {
      // Extract user ID from the file name
      const userId = parseInt(file.match(/UserTasks_(\d+)\.xlsx/)[1]);

      // Fetch user details
      const user = await userService.getUserById(userId);

      // If user found, send email with the Excel file attached
      if (user) {
        const filePath = path.join(excelDir, file);

        // Message object
        const message = {
          from: 'suryanshtejas@gmail.com', // Sender address (must be your Gmail address)
          to: user.email, // Recipient's email address
          subject: 'Your Weekly Tasks Report', // Subject line
          text: `Dear ${user.firstname},\n\nPlease find attached your weekly tasks report.\n\nBest regards,\nYour Task Management Team`, // Plain text body
          attachments: [
            {
              filename: file, // File name as attachment
              path: filePath, // Path to the file
            },
          ],
        };

        // Send email
        const info = await transporter.sendMail(message);
        console.log(`Email sent to ${user.email}: ${info.response}`);
      } else {
        console.error(`User with ID ${userId} not found.`);
      }
    }
  } catch (error) {
    console.error('Failed to send emails:', error.message);
    throw new Error('Failed to send emails');
  }
}

module.exports = {
  sendEmails,
};

