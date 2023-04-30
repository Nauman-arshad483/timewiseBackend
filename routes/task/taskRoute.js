const express = require('express');
const router = express.Router();
const Task = require('../../models/Tasks');

require('dotenv').config();
// POST a new task
router.post('/api/tasks', async (req, res) => {
  const { task, description, category, priority, dueDate } = req.body;
  const { userId } = req.body;
  console.log("task..",task)
  console.log("description..",description)
  console.log("category..",category)
  console.log("priority..",priority)
  console.log("dueDate..",dueDate)
  console.log("userId..",userId)
  try {
    const newTask = await Task.create({
      task,
      description,
      category,
      priority,
      dueDate,
      userId,
    });
    res.status(201).json({ message: 'New task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all tasks for a user
router.get('/api/tasks', async (req, res) => {
  const userId = req.query.userId;
  try {
    const tasks = await Task.find({ userId });
    console.log("tasks are...",tasks)
    res.status(200).json({ message: 'All tasks retrieved successfully', data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Mark a task as completed
router.put('/api/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const completed = req.body.completed;
  console.log('taskId:', taskId);
  console.log('completed:', completed);
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );
    res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
