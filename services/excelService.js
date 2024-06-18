// services/excelService.js
const ExcelJS = require('exceljs');
const userService = require('./userService');
const taskService = require('./taskService');
const fs = require('fs');
const path = require('path');

async function generateTasksExcel() {
  try {
    // Fetch all users
    const users = await userService.getUsers();

    // Directory path for saving Excel files
    const excelDir = path.join(__dirname, '..', 'excel');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(excelDir)) {
      fs.mkdirSync(excelDir);
    }

    // Loop through each user
    for (const user of users) {
      // Fetch tasks for the current user
      const tasks = await taskService.getTasksByUserId(user.id);

      // Create a new workbook and a worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('User Tasks');

      // Define columns
      worksheet.columns = [
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'User Name', key: 'userName', width: 20 },
        { header: 'Task Name', key: 'taskName', width: 30 },
        { header: 'Task Date', key: 'taskDate', width: 15 },
        { header: 'Working Hours', key: 'workingHours', width: 15 },
        { header: 'Description', key: 'description', width: 40 },
      ];

      // Variables for calculating total working hours
      let totalWorkingHours = 0;

      // Add rows for each task of the current user
      for (const task of tasks) {
        const row = {
          userId: user.id,
          userName: `${user.firstname} ${user.lastname}`,
          taskName: task.taskname,
          taskDate: task.taskdate , // Check if taskDate exists
          workingHours: task.workinghours,
          description: task.description || '',
        };

        // Add working hours to total
        totalWorkingHours += parseFloat(task.workinghours);

        worksheet.addRow(row);
      }

      // Add a row for total working hours
      worksheet.addRow({
        userId: '', // Empty string or other identifier for total row
        userName: 'Total', // Label for total row
        taskName: '', // Empty cells for formatting
        taskDate: '',
        workingHours: totalWorkingHours.toFixed(2), // Format to two decimal places
        description: '',
      });

      // Generate a unique file name for the user based on user ID and current timestamp
      const fileName = `UserTasks_${user.id}.xlsx`;
      const filePath = path.join(excelDir, fileName); // Adjust the path to excelDir

      // Write workbook to file
      await workbook.xlsx.writeFile(filePath);
      console.log(`Excel file generated successfully for User ID ${user.id}: ${filePath}`);
    }

  } catch (error) {
    console.error('Failed to generate Excel files:', error.message);
  }
}

module.exports = {
  generateTasksExcel,
};
