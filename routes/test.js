const express = require("express");
const { db } = require("../firebase");
const router = express.Router();

router.post("/submitOp", (req, res) => {
  console.log(req.body);
});
router.post("/submitOwner", (req, res) => {
  console.log(req.body);
});

router.get("/test", (req, res) => {
  res.json({ message: "Hello from express" });
});

module.exports = router;
