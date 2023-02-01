const express = require("express");
const router = express.Router();
const RunappService = require("./../services/runapp.service");

const service = new RunappService();

router.post("/", async(req, res) => {
  const result = await service.startScrapping();
  res.send(result);
});

module.exports = router;
