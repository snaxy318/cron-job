const Designation = require('../models/designation');

class DesignationService {
  async createDesignation(designationData) {
    try {
      const designation = await Designation.create(designationData);
      return designation;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create designation');
    }
  }

  async getDesignations() {
    try {
      const designations = await Designation.findAll();
      return designations;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve designations');
    }
  }

  async updateDesignation(id, newData) {
    try {
      const designation = await Designation.findByPk(id);
      if (!designation) {
        throw new Error('Designation not found');
      }
      await designation.update(newData);
      return designation;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update designation');
    }
  }

  async deleteDesignation(id) {
    try {
      const designation = await Designation.findByPk(id);
      if (!designation) {
        throw new Error('Designation not found');
      }
      await designation.destroy();
      return 'Designation deleted successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete designation');
    }
  }
}

module.exports = new DesignationService();
