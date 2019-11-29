const fs = require('fs')
const chalk = require('chalk')
// Add a new note
const addNotes = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title == title)
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title == title
    // })
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNote(notes)
        console.log('New note added')
    } else {
        console.log('Title already taken')
    }
}

// Save a note 
// ANother way to write function
const saveNote = function(note) {
    const noteData = JSON.stringify(note)
    fs.writeFileSync('notes.json',noteData)
}

// Load notes
const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    } catch(e) {
        return []
    }
}

// Remove note
const removeNote = function(title) {
    const notes = loadNotes()
    const data = notes.filter(function(note) {
        // one way
        // if (title == note.title) {
        //     delete notes[title];
        //     return false
        // } else {
        //     return true
        // }
        // second way
        return note.title !== title
    })
    if (notes.length >  data.length)  {
        console.log(chalk.green.inverse('Note removed'))
        saveNote(data)  
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

// List note
const listNotes = () => {
    const notes = loadNotes()
    if(notes.length > 0) {
        notes.forEach(element => {
            console.log(chalk.blue.inverse(element.title))
        });
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

// Read a note
const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title == title)
    if (noteToRead) {
        console.log(chalk.yellow.inverse('Opening note to read'))
        console.log(chalk.magenta.inverse(`Note title: ${noteToRead.title}`))
        console.log(chalk.green.inverse(`Note Body: ${noteToRead.body}`))
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}