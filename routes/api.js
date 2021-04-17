const router = require('express').Router();
const Notes = require('../db/Notes');

router.get('/notes', (req, res) => {
    Notes.parseNotes().then(info => res.json(info)).catch(err => res.json(err));
})

router.post('/notes', (req, res) => {
    Notes.addNote(req.body).then(info => res.json(info)).catch(err => res.json(err));
})

module.exports = router;