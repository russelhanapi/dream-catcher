const Dream = require('../models/dreamModel');
const mongoose = require('mongoose');

// GET all dream entries
const getAllDreamEntries = async (req, res) => {
  const dreamEntries = await Dream.find({}).sort({ createdAt: -1 });
  res.status(200).json(dreamEntries);
};

// GET a specific dream entries (id)
const getDreamEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Entry does not exist' });
  const dreamEntry = await Dream.findById(id);
  if (!dreamEntry) {
    return res.status(404).json({ error: 'Entry does not exist' });
  }
  res.status(200).json(dreamEntry);
};

// POST/create a new entry
const createDreamEntry = async (req, res) => {
  const { title, description, mood } = req.body;
  if (!title || !description || !mood)
    return res.status(400).json({ error: 'Please fill in all the fields' });

  try {
    const dream = await Dream.create({ title, description, mood });
    res.status(201).json(dream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE an entry
const deleteDreamEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Entry does not exist' });
  const dreamEntry = await Dream.findByIdAndDelete(id);
  if (!dreamEntry) {
    return res.status(404).json({ error: 'Entry does not exist' });
  }
  res.status(200).json(dreamEntry);
};

// PATCH/update an entry
const updateDreamEntry = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Entry does not exist' });

  const dreamEntry = await Dream.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!dreamEntry) {
    return res.status(404).json({ error: 'Entry does not exist' });
  }
  res.status(200).json(dreamEntry);
};

module.exports = {
  createDreamEntry,
  getAllDreamEntries,
  getDreamEntry,
  deleteDreamEntry,
  updateDreamEntry,
};
