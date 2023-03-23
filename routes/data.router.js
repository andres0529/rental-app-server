const express = require("express");
const router = express.Router();
const dataService = require("./../services/data.service");

// Retrieve data into the DB
router.get("/", async (req, res) => {
  try {
    const records = await dataService.find(req, res);
    return res.json(records);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
});

// Remove data from DB according to one ID
router.delete("/", async (req, res) => {
  const ads = await dataService.delete(req);
 return res.json(ads);
});

module.exports = router;
