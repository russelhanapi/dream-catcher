const express = require('express');
const {
  createDreamEntry,
  getAllDreamEntries,
  getDreamEntry,
  updateDreamEntry,
  deleteDreamEntry,
} = require('../controllers/dreamController');

const router = express.Router();

// GET all dream entries
router.get('/', getAllDreamEntries);

// GET a specific dream entries (id)
router.get('/:id', getDreamEntry);

// POST/create a new entry
router.post('/', createDreamEntry);

// DELETE an entry
router.delete('/:id', deleteDreamEntry);

// PATCH/update an entry
router.patch('/:id', updateDreamEntry);

module.exports = router;
