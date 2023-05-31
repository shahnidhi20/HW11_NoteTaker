const fs = require("fs");

const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`, "utf8"));

// app.get("/api/v1/notes", getAllNotes);
//middleware to check the ID for the search is valid id
exports.checkID = (req, res, next, val) => {
  if (req.params.id > notes.length) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.title) {
    return res.status(400).json({
      status: "fail",
      message: "Note title cannot be empty",
    });
  }
  next();
};

exports.getAllNotes = (req, res) => {
  console.log("GET ALL NOTES API");
  res.status(200).json({
    status: "success",
    results: notes.length,
    data: {
      notes: notes,
    },
  });
};
// //GET notes by id
// //example of the URL /api/v1/notes/:id/:x/:v? (optional parameters with ?)
// app.get("/api/v1/notes/:id", getNote);
exports.getNote = (req, res) => {
  //find the note with the matching id pass in the params

  const note = notes.find((note) => note.id === parseInt(req.params.id));

  //   if (!note) {
  //     return res.status(404).json({
  //       status: "error",
  //       message: "Note not found",
  //     });
  //   }

  res.status(200).json({
    status: "success",
    data: {
      note: note,
    },
  });
};
//POST a new note
exports.createNote = (req, res) => {
  const noteId = notes[notes.length - 1].id + 1;
  const newNote = Object.assign({ id: noteId }, req.body);

  notes.push(newNote);

  fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), (err) => {
    //once the file has been written, the server will respond with a status of 201 and the new note
    res.status(201).json({
      status: "success",
      data: {
        note: newNote,
      },
    });
  });
};

exports.deleteNote = (req, res) => {
  //find the note with the matching id pass in the params

  const note = notes.find((note) => note.id === parseInt(req.params.id));
  console.log("Note found", note);
  notes.splice(notes.indexOf(note), 1);

  console.log(notes);
  fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), (err) => {
    res.status(200).json({
      status: "success",
      data: null,
    });
  });
};
