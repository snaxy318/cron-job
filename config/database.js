const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
const env = require('dotenv');

env.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TaskManagement',
    password: process.env.POSTGRES_PASS,
    port: 5432,
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

const sequelize = new Sequelize('TaskManagement', 'postgres', 'anshu3505', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432, // Your PostgreSQL port
});

module.exports = { pool, connectDB };
module.exports = sequelize;
