const userService = require('../services/userService');

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    // console.log(userData);
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, updatedUserData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await userService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
