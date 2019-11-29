const yargs = require('yargs');
const notes = require('./notes')

// Add a note (node app.js add --title='Some title' --body='Some body')
yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {  
        title: {
            describe: 'Note title',
            demandOption : true, // required
            type: 'string' // datatype
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv)  {
        notes.addNotes(argv.title,argv.body)
    }
});

// Remove a note (node app.js remove --title='Some title')
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

// List command (node app list)
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler: () => {
        notes.listNotes()
    }
})

// Read note node app read --title='some title'
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

yargs.parse()