const express = require("express");
const router = express.Router();
const runappService = require("./../services/runapp.service");

// const service = new RunappService();

router.post("/", async (req, res) => {
  const result = await runappService.run();
  res.send(result);
});

module.exports = router;
