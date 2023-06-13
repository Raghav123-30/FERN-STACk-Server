const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { auth } = require("../firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const secret = "pequrelInterns@$!!8*";

router.post("/login", async function (req, res) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const payload = { email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(200).json({ token: token, message: "SUCCESS" });
  } catch {
    res.status(500).json({
      message: "INVALID CREDENTIALS",
      data: false,
    });
  }
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
