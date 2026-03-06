const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validators');

const router = express.Router();

// All task routes require authentication
router.use(verifyToken);

router.route('/').post(validateTask, createTask).get(getTasks);

router.route('/:id').get(getTaskById).put(validateTask, updateTask).delete(deleteTask);

module.exports = router;

