const express = require("express");
const router = express.Router();
const DataService = require("./../services/data.service");

const service = new DataService();

// Retrieve all the data into the DB
router.get("/", async (req, res) => {
  try {
    const records = await service.findAll();
    res.json(records);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

// Retrieve only the data that meets the filter into the DB
router.get("/filter", async (req, res) => {
  const ads = await service.findbyFilter(req.query);
  res.json(ads);
});

// Remove data from DB
router.delete("/", async (req, res) => {
  const ads = await service.delete(req.body);
  res.json(ads);
});

module.exports = router;
