const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  departmentid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'departmentid' // Specify the correct column name in the database
  },
  departmentname: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  tableName: 'department',
  timestamps: false 
});


module.exports = Department;
