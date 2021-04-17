const router = require('express').Router();
const PATH = require('path');

router.get('/', function (req, res) {
    res.sendFile(PATH.join(__dirname, '../public/index.html'))
});

router.get('/notes', function (req, res) {
    res.sendFile(PATH.join(__dirname, '../public/notes.html'))
});

module.exports = router;