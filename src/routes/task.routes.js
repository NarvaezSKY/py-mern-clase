const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json({ task });
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json({ status: 'Tarea guardada correctamente' });
});

router.put('/:id', async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTask = { title, description };
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTask);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json({ status: 'Tarea actualizada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  });
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ status: 'Tarea eliminada correctamente' });
});

module.exports = router;
