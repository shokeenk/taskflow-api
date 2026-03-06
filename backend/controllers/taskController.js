const mongoose = require('mongoose');
const Task = require('../models/taskModel');
const User = require('../models/User');
const { success } = require('../utils/apiResponse');
const { ApiError } = require('../middleware/errorHandler');

const isAdmin = (user) => user?.role === User.ROLES.ADMIN;

const canAccessTask = (reqUser, task) => {
  if (!reqUser || !task) return false;
  if (isAdmin(reqUser)) return true;
  return task.userId.toString() === reqUser._id.toString();
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    userId: req.user._id
  });

  return success(res, {
    statusCode: 201,
    message: 'Task created',
    data: { task }
  });
};

exports.getTasks = async (req, res) => {
  const filter = isAdmin(req.user) ? {} : { userId: req.user._id };
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return success(res, { data: { tasks } });
};

exports.getTaskById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid task id');
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (!canAccessTask(req.user, task)) {
    throw new ApiError(403, 'Forbidden');
  }

  return success(res, { data: { task } });
};

exports.updateTask = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid task id');
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (!canAccessTask(req.user, task)) {
    throw new ApiError(403, 'Forbidden');
  }

  const { title, description, status } = req.body;
  if (typeof title !== 'undefined') task.title = title;
  if (typeof description !== 'undefined') task.description = description;
  if (typeof status !== 'undefined') task.status = status;

  await task.save();
  return success(res, { message: 'Task updated', data: { task } });
};

exports.deleteTask = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid task id');
  }

  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (!canAccessTask(req.user, task)) {
    throw new ApiError(403, 'Forbidden');
  }

  await task.deleteOne();
  return success(res, { message: 'Task deleted', data: {} });
};
