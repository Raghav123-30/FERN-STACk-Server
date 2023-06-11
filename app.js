const bodyParser = require("body-parser");
const express = require("express");
const { db } = require("./firebase");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secret = "pequrelInterns@$!!8*";
const {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} = require("firebase/firestore");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );
  next();
});
const authRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owners");
const operatorRoutes = require("./routes/operator");
const productRoutes = require("./routes/product");
const geographyCropRoutes = require("./routes/geographyAndCrops");
const homeRoutes = require("./routes/home");
const testRoutes = require("./routes/test");

app.use("/api", authRoutes);
app.use("/api", ownerRoutes);
app.use("/api", operatorRoutes);
app.use("/api", productRoutes);
app.use("/api", geographyCropRoutes);
app.use("/api", homeRoutes);
app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>This is a server side application built for pequrel </h1>");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
