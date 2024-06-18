const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const env = require('dotenv');

env.config();

// Middleware
app.use(bodyParser.json());

// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const excelRoutes = require('./routes/excelRoutes');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);
app.use('/designations', designationRoutes);
app.use('/excel', excelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// sendMail.js
const cron = require('node-cron');
const excelService = require('./services/excelCompleteService');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Function to generate Excel and send email
async function sendExcelEmail() {
  try {
    // Generate Excel file for all users
    await excelService.generateTasksExcel();

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
    //await transporter.sendMail(mailOptions);
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

module.exports = {
  sendExcelEmail,
};










