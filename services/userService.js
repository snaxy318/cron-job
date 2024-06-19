const User = require('../models/user');
const Department = require('../models/department');
const Designation = require('../models/designation');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userData) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      return User.create({
        ...userData,
        password: hashedPassword
      });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create user');
    }
  }

  async getUserByUsername (username) {
    return User.findOne({ where: { username } });
  };

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
