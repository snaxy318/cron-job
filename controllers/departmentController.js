const departmentService = require('../services/departmentService');

// Controller function to get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new department
const createDepartment = async (req, res) => {
  const departmentData = req.body;
  try {
    const newDepartment = await departmentService.createDepartment(departmentData);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing department
const updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
  const updatedDepartmentData = req.body;
  try {
    const updatedDepartment = await departmentService.updateDepartment(departmentId, updatedDepartmentData);
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a department
const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;
  try {
    await departmentService.deleteDepartment(departmentId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
