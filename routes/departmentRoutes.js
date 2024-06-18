const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Define routes
router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
