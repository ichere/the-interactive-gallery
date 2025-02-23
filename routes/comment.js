const express = require("express");
const db = require("../database");

const router = express.Router();

// Get all comments for an image
router.get("/:imageId", async (req, res) => {
  const { imageId } = req.params;
  try {
    const result = await db.query("SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC", [imageId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
});

// Post a new comment
router.post("/", async (req, res) => {
  const { imageId, username, text } = req.body;

  if (!text || text.length < 3) {
    return res.status(400).json({ error: "Comment must be at least 3 characters long" });
  }

  try {
    const result = await db.query(
      "INSERT INTO comments (image_id, username, text) VALUES ($1, $2, $3) RETURNING *",
      [imageId, username, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to post comment" });
  }
});

module.exports = router;
