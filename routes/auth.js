const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secret = "pequrelInterns@$!!8*"; // Replace with your actual secret key

router.post("/login", (req, res) => {
  console.log(req.body);

  // In a real app, you should validate the user's credentials here

  const username = "raghav";
  const payload = { username }; // You can include additional data here
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  res.status(200).json({ token: token, message: "SUCCESS" });
});

router.post("/checkAuthState", (req, res) => {
  const token = req.body.token;
  console.log(token);

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    res.sendStatus(200); // OK
  });
});

module.exports = router;
