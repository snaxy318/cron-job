const Task = require('../models/task');
const User = require('../models/user');

class TaskService {
  
  async createTask(taskData,userid) {
    try {
      const task = await Task.create({...taskData,userid});
      return task;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create task');
    }
  }

  async getTasks() {
    try {
      const tasks = await Task.findAll();
      return tasks;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve tasks');
    }
  }

  async getTasksByUserId(userId) {
    try {
      const tasks = await Task.findAll({
        where: { userid: userId },
      });
      return tasks;
    } catch (error) {
      console.log(error.message);
      throw new Error(`Failed to retrieve tasks: ${error.message}`);
    }
  }

  async getTasksWithUserDetails() {
    try {
      const tasks = await Task.findAll({
        include: [{
          model: User,
          attributes: ['id','firstname', 'lastname']
        }],
        attributes: ['taskname', 'taskdate', 'workinghours', 'description']
      });
      return tasks;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve tasks with user details');
    }
  }

  async updateTask(taskId, newData) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.update(newData);
      return task;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update task');
    }
  }

  async deleteTask(taskId) {
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      await task.destroy();
      return 'Task deleted successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete task');
    }
  }
}

module.exports = new TaskService();
