const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const env = require('dotenv');

env.config();

// Middleware
app.use(bodyParser.json());

// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const excelRoutes = require('./routes/excelRoutes');
const sendMail = require('./sendMail');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');   // Use auth middleware to protect routes

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users',authMiddleware, userRoutes);
app.use('/departments', departmentRoutes);
app.use('/designations', designationRoutes);
app.use('/excel', excelRoutes);
app.use('/register', userRoutes);
app.use('/mail',sendMail);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});