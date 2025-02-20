require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/api/images", async (req, res) => {
    try {
      const response = await axios.get("https://api.unsplash.com/photos", {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching images" });
    }
  });

app.get('/', (req, res) => {
    res.send("Thus begin your villian gallery story");
});

app.listen(PORT, () => {
    console.log(`Server is walking on port ${PORT}`)
});