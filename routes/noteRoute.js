const express = require("express");
const {
  getAllNotes,
  createNote,
  getNote,
  checkID,
  checkBody,
  deleteNote,
} = require("./../controllers/noteController");

const router = express.Router();

router.param("id", checkID);

//check body middleware function
//if body contains name and text property

router.route("/").get(getAllNotes).post(checkBody, createNote);
router.route("/:id").get(getNote).delete(deleteNote);

module.exports = router;
