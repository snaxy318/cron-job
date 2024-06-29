// middleware/authMiddleware.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is present and properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
