const User = require('../models/user');
const Department = require('../models/department');
const Designation = require('../models/designation');

class UserService {
  async createUser(userData) {
    try {
      const user = await User.create(userData);
      console.log("In here");
      return user;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId,{
        include: [
          { model: Department, attributes: ['departmentname'] },
          { model: Designation, attributes: ['designationname'] }
        ]
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to retrieve user');
    }
  }

  async getUsers() {
    try {
      const users = await User.findAll({
        include: [
          { model: Department, attributes: ['departmentname'] },
          { model: Designation, attributes: ['designationname'] }
        ]
      });
      return users;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve users');
    }
  }

  async updateUser(userId, newData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.update(newData);
      return user;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

module.exports = new UserService();
