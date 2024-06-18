const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./department');
const Designation = require('./designation');
const Task = require('./task');

const User = sequelize.define('user', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departmentid: {
    type: DataTypes.INTEGER, // Assuming DepartmentId is of type INTEGER
    allowNull: false,
    field: 'departmentid' // Specify the correct column name in the database
  },
  designationid: {
    type: DataTypes.INTEGER, // Assuming DesignationId is of type INTEGER
    allowNull: false,
    field: 'designationid' // Specify the correct column name in the database
  }
},{
  tableName: 'user',
  timestamps: false 
});

// Define associations
User.belongsTo(Department, { foreignKey: 'departmentid' });
User.belongsTo(Designation, { foreignKey: 'designationid' });
// User.hasMany(Task, { foreignKey: 'userid' });

module.exports = User;
