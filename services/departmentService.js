const Department = require('../models/department');

class DepartmentService {
  async createDepartment(departmentData) {
    try {
      const department = await Department.create(departmentData);
      return department;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create department');
    }
  }

  async getDepartments() {
    try {
      const departments = await Department.findAll();
      return departments;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve departments');
    }
  }

  async updateDepartment(departmentId, newData) {
    try {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new Error('Department not found');
      }
      await department.update(newData);
      return department;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update department');
    }
  }

  async deleteDepartment(departmentId) {
    try {
      const department = await Department.findByPk(departmentId);
      if (!department) {
        throw new Error('Department not found');
      }
      await department.destroy();
      return 'Department deleted successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete department');
    }
  }
}

module.exports = new DepartmentService();
