const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')


// ROUTE 1: Get All Notes
router.get('/fetchnotes', async (req, res) => {
    try {
        const notes = await Note.find(); 
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a New Note
router.post('/addnote', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create and save the new note
        const note = new Note({
            title,
            description
            // You may not need to set a user field if managing only one user
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error('Error adding note:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update a Note
router.put('/updatenote/:id', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;

        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error('Error updating note:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete a Note
router.delete('/delete/:id', async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note });
    } catch (error) {
        console.error('Error deleting note:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
