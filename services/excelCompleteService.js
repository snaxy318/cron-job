const ExcelJS = require('exceljs');
const userService = require('./userService');
const taskService = require('./taskService');

async function generateTasksExcel() {
  try {
    // Fetch all users
    const users = await userService.getUsers();

    // Create a new workbook and a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('User Tasks');

    //define header style
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    // Define columns
    worksheet.columns = [
      { header: 'User Name', key: 'userName', width: 20,style: headerStyle},
      { header: 'Task Name', key: 'taskName', width: 30,style: headerStyle },
      { header: 'Task Date', key: 'taskDate', width: 15,style: headerStyle },
      { header: 'Working Hours', key: 'workingHours', width: 15,style: headerStyle },
      { header: 'Description', key: 'description', width: 40,style: headerStyle },
    ];

    // Loop through each user and fetch their tasks
    for (const user of users) {
      const tasks = await taskService.getTasksByUserId(user.id);
      let totalHours = 0;
      let firstTask = true;

      for (const task of tasks) {
        totalHours += task.workinghours;

        if (firstTask) {
          worksheet.addRow({
            userName: `${user.firstname} ${user.lastname}`,
            taskName: task.taskname,
            taskDate: task.taskdate,
            workingHours: task.workinghours,
            description: task.description,
          });
          firstTask = false;
        } else {
          worksheet.addRow({
            userName: '',
            taskName: task.taskname,
            taskDate: task.taskdate,
            workingHours: task.workinghours,
            description: task.description,
          });
        }
      }

      // Add total hours row for the user
      worksheet.addRow({
        userName: '',
        taskName: '',
        taskDate: '',
        workingHours: `Total: ${parseFloat(totalHours)}`,
        description: '',
      });

      // Add an empty row for better readability between users
      worksheet.addRow({});
    }

    // Write to a file
    await workbook.xlsx.writeFile('UserTasks.xlsx');
    console.log('Excel file generated successfully');
  } catch (error) {
    console.error('Failed to generate Excel file:', error.message);
  }
}

module.exports = {
  generateTasksExcel,
};
