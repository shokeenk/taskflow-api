const express = require('express');
const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');
const taskRoutes = require('./taskRoutes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
