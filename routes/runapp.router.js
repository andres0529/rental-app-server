const express = require("express");
const router = express.Router();
const runappService = require("./../services/runapp.service");


router.post("/", async (req, res) => {
  const result = await runappService();
  res.send(result);
});

module.exports = router;
