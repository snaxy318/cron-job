const taskService = require('../services/taskService');

// Controller function to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Contoller fucntion to get all the user task
async function getTasksByUserId(req, res) {
  const userId = parseInt(req.user.id);
  console.log(req.user.id);
  try {
    const tasks = await taskService.getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller function to create a new task
const createTask = async (req, res) => {
  const taskData = req.body;
  const userid = req.user.id;
  try {
    const newTask = await taskService.createTask(taskData,userid);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing task
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;
  try {
    const updatedTask = await taskService.updateTask(taskId, updatedTaskData);
    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await taskService.deleteTask(taskId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getTasksWithUserDetails = async (req, res) => {
  try {
    const tasks = await taskService.getTasksWithUserDetails();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTasksByUserId,
  createTask,
  getTasksWithUserDetails,
  updateTask,
  deleteTask
};
