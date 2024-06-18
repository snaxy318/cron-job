const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Designation = sequelize.define('Designation', {
  designationtid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'designationid' // Specify the correct column name in the database
  },
  designationname: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  tableName: 'designation',
  timestamps: false 
});

module.exports = Designation;
