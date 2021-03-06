const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const viewRoutes = require('./routes/view');
// const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 4600;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// app.use('/', viewRoutes);
// app.use('/api', apiRoutes);

//API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function read(err, data) {
        const parsedata = JSON.parse(data);
        if (err) {
            throw err;
        }
        res.json(parsedata);
    })
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }

        let notes = JSON.parse(data);
        req.body.id = uuidv4();
        notes.push(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) {
                throw err;
            }
            res.json(req.body)
        })
    });
});

app.delete('/api/notes/:id', (req, res) => {
    // user wants to delete a note
    // which note do they want to delete?
    // edit our "DB" to reflect the delete

    fs.readFile('./db/db.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        let notes = JSON.parse(data);
        let newNotes = notes.filter((note) => {
            return req.params.id !== note.id;
        })

        fs.writeFile('./db/db.json', JSON.stringify(newNotes), err => {
            console.log(err);
            res.json(req.body);
        })
    });
})


// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));