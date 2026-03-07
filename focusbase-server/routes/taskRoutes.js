const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// Wrap the routes you want to protect
router.route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router.route("/:_id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

// // Root routes
// router.post('/', createTask);
// router.get('/', getTasks);

// // ID-specific routes
// router.put('/:_id', updateTask);
// router.delete('/:_id', deleteTask);

module.exports = router;
