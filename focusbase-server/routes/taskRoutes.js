
const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

// Root routes
router.post('/', createTask);
router.get('/', getTasks);

// ID-specific routes
router.put('/:_id', updateTask);
router.delete('/:_id', deleteTask);

module.exports = router;

