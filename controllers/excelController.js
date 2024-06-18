const excelService = require('../services/excelService');

async function generateTasksExcel(req, res) {
  try {
    await excelService.generateTasksExcel();
    res.status(200).send('Excel file generated successfully');
  } catch (error) {
    res.status(500).send(`Error generating Excel file: ${error.message}`);
  }
}

const generateAndSendExcel = async (req, res) => {
  try {
    // Generate Excel file for all users
    await excelService.generateTasksExcel();

    // Send emails with the Excel file to users
    await emailUtils.sendEmails();

    res.status(200).json({ message: 'Excel file generated and emails sent successfully' });
  } catch (error) {
    console.error('Failed to generate and send Excel file:', error.message);
    res.status(500).json({ message: 'Failed to generate and send Excel file', error: error.message });
  }
};

module.exports = {
  generateTasksExcel,
  generateAndSendExcel,
};
