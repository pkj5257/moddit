const express = require("express");
const router = express.Router();
// const fs = require("fs");
// const bodyParser = require('body-parser');
// const path = require("path");
// const crypto = require("crypto");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
const isLoggedIn = require("../../middleware/auth");
// const User = require("../../models/User");
// const Post = require("../../models/Post");
// const Marketplace = require("../../models/Marketplace");
// const Comment = require("../../models/Comment");
const Leaderboard = require("../../models/Leaderboard");
// const File = require('../../models/File');
// const methodOverride = require('method-override');
// const db = require("../../config/default.json");
// const mongoURI = db.mongoURI;
const { check, validationResult } = require("express-validator");
// const { disconnect } = require("process");

// @router GET
// @desc Gets all the leaderboard
router.get("/", async (req, res) => {
  try {
    let leaderboard = await Leaderboard.find().sort({ posts: -1 });
    console.log(leaderboard);
    res.json(leaderboard);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @router GET
// @desc Gets leaderboard by userid
router.get("/:user_id", async (req, res) => {
  try {
    let newLeaderboard = await Leaderboard.findOneAndUpdate({ author: req.params.user_id }, { $inc: { posts: 0 } }, { new: true, upsert: true });
    console.log(newLeaderboard);
    res.json(newLeaderboard); 
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;