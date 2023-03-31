const express = require("express");
const runappfileService = require("./../services/runappfile.service");
const router = express.Router();

router.post("/", async (req, res) => {
  const result = await runappfileService(req.body);
  res.sendStatus(result);
});

module.exports = router;
