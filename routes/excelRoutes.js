const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');

router.get('/generate-tasks-excel', excelController.generateTasksExcel);
router.get('/generate-excel', excelController.generateAndSendExcel);

module.exports = router;
