const express = require("express");
const compression = require("compression");
const path = require("path");
const noteRouter = require("./routes/noteRoute");

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
}
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

//mounting the noteRouter
app.use("/api/v1/notes", noteRouter);
app.use(express.static("public"));
// app.use(express.static(`${__dirname}/public`));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"));
});

module.exports = app;
