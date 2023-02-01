const express = require("express");
const router = express.Router();
const Runappfile = require("./../services/runappfile.service");

const service = new Runappfile();
router.post("/", async(req, res) => {
  const result = await service.startRunappfile(req.body);
  res.send(result);
});

module.exports = router;
