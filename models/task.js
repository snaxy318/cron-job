const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Task = sequelize.define('Task', {
  taskid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'taskid'
  },
  taskname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  workinghours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
},{
  tableName: 'task',
  timestamps: false 
});

Task.belongsTo(User , { foreignKey: 'userid' });

module.exports = Task;
