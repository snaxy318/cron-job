// sendMail.js
const cron = require('node-cron');
const excelService = require('./services/excelService');
const emailUtils = require('./utils/emailUtils');
const path = require('path');

// Function to send emails
async function sendMail() {
  try {
    // Generate Excel files for all users
    console.log("In here");
    await excelService.generateTasksExcel();

    // Send emails with Excel files to users
    await emailUtils.sendEmails();
  } catch (error) {
    console.log('Failed to send emails:', error.message);
    throw new Error('Failed to send emails');
  }
}

// Schedule the cron job to run every 7 days (every week)
cron.schedule('0 0 * * 0', () => {
  console.log('Running sendMail cron job');
  sendMail()
    .then(() => console.log('Emails sent successfully.'))
    .catch((err) => console.log('Error sending emails:', err));
});
