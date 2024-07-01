const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes
router.get('/', taskController.getAllTasks);
router.get('/with-user-details',taskController.getTasksWithUserDetails);
router.get('/user/tasks',authMiddleware, taskController.getTasksByUserId);
router.post('/',authMiddleware, taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
