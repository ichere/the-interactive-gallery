const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get comments for an image
router.get("/:imageId", async (req, res) => {
  const { imageId } = req.params;
  const result = await db.query("SELECT * FROM comments WHERE image_id = $1", [imageId]);
  res.json(result.rows);
});

// Add a comment
router.post("/", async (req, res) => {
  const { imageId, username, text } = req.body;
  await db.query("INSERT INTO comments (image_id, username, text) VALUES ($1, $2, $3)", [imageId, username, text]);
  res.status(201).json({ message: "Comment added" });
});

module.exports = router;
