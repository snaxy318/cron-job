const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes
router.get('/', taskController.getAllTasks);
router.get('/with-user-details', taskController.getTasksWithUserDetails);
router.get('/user/:userId/tasks', taskController.getTasksByUserId);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
