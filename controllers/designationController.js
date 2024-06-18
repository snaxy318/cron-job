const designationService = require('../services/designationService');

// Controller function to get all designations
const getAllDesignations = async (req, res) => {
  try {
    const designations = await designationService.getDesignations();
    res.json(designations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new designation
const createDesignation = async (req, res) => {
  const designationData = req.body;
  try {
    const newDesignation = await designationService.createDesignation(designationData);
    res.status(201).json(newDesignation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing designation
const updateDesignation = async (req, res) => {
  const designationId = req.params.id;
  const updatedDesignationData = req.body;
  try {
    const updatedDesignation = await designationService.updateDesignation(designationId, updatedDesignationData);
    res.json(updatedDesignation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a designation
const deleteDesignation = async (req, res) => {
  const designationId = req.params.id;
  try {
    await designationService.deleteDesignation(designationId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation
};
