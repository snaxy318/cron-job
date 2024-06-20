const { Sequelize } = require('sequelize');
const env = require('dotenv');

env.config();

const sequelize = new Sequelize('TaskManagement', 'postgres', process.env.POSTGRES_PASS, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432, // Your PostgreSQL port
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the testConnection function to initiate the connection attempt
testConnection();

module.exports = sequelize;
