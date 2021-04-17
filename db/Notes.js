const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Notes {
    read(){
        return readFile('db/db.json', 'utf8');
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }
    parseNotes() {
        return this.read().then(rawNotes => {
            var notesArray = [];

            try {
                notesArray = notesArray.concat(JSON.parse(rawNotes))
            } catch (error) {
                console.log(error);
                notesArray = [];
            }

            return notesArray;
        })
    }
    addNote(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            id: uuidv4(),
        }

        return this.parseNotes().then(notesArray => [...notesArray, newNote]).then(newNotesArray => this.write(newNotesArray)).then(() => newNote);
    }
}

module.exports = new Notes();
