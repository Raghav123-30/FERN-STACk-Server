const bodyParser = require("body-parser");
const express = require("express");
const { db } = require("./firebase");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secret = "pequrelInterns@$!!8*";
const { getDocs, collection, addDoc } = require("firebase/firestore");
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

app.post("/api/login", (req, res) => {
  console.log(req.body);

  // In a real app, you should validate the user's credentials here

  const username = "raghav";
  const payload = { username }; // You can include additional data here
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  res.status(200).json({ token: token, message: "SUCCESS" });
});

app.post("/api/checkAuthState", (req, res) => {
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

app.post("/api/submitOp", (req, res) => {
  console.log(req.body);
});
app.post("/api/submitOwner", (req, res) => {
  console.log(req.body);
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from express" });
});

app.get("/api/listowners", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Location");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            owner: doc.data().owner,
            phone: doc.data().phoneno,
            adharNumber: doc.data().adhar,
            address: doc.data().location,
            season: doc.data().season,
            cost: doc.data().cost,
          };
          console.log(document);
          documents.push(document);
        });
      })
      .then(() => {
        res.status(200).json({
          message: "SUCCESS",
          data: documents,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
app.get("/api/listop", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Operator");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            fullName: doc.data().fullName,
            phone: doc.data().phone,
            adharNumber: doc.data().adharNumber,
            address: doc.data().address,
            location: doc.data().location,
          };
          console.log(document);
          documents.push(document);
        });
      })
      .then(() => {
        res.status(200).json({
          message: "SUCCESS",
          data: documents,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
app.get("/api/getAllAddress", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Location");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            location: doc.data().location,
            numTrays: doc.data().numTrays,
          };
          console.log(document);
          documents.push(document);
        });
      })
      .then(() => {
        res.status(200).json({
          message: "SUCCESS",
          data: documents,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
app.post("/api/addop", async (req, res) => {
  const operatorCollection = collection(db, "Operator");

  const body = req.body;
  console.log("Hi........");

  console.log(
    body.fullName,
    body.address,
    body.location,
    body.phone,
    body.adhar
  );
  try {
    await addDoc(operatorCollection, {
      fullName: body.fullName,
      address: body.address,
      adharNumber: body.adhar,
      phone: body.phone,
      location: body.location,
    }).then(() => {
      console.log("Added successfully");
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
app.post("/api/addloc", async (req, res) => {
  const operatorCollection = collection(db, "Location");
  const body = req.body;
  console.log(body);

  try {
    await addDoc(operatorCollection, {
      location: body.address,
      owner: body.fullName,
      phoneno: body.phone,
      adhar: body.adhar,
    }).then(() => {
      console.log("Added successfully");
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});

app.post("/api/updateop", async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    console.log(body);
    const docRef = doc(db, "Operator", body.id);
    await updateDoc(docRef, {
      fullName: body.fullName,
      address: body.address,
      adharNumber: body.adharNumber,
      phone: body.phone,
      location: body.location,
    }).then(() => {
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
app.post("/api/deleteop", async (req, res) => {
  const body = JSON.parse(req.body);
  const id = body.id;
  const docRef = doc(db, "Operator", body.id);
  try {
    await deleteDoc(docRef).then(() => {
      res.status(200).json({
        message: "SUCCESSFULLY DELETED THE OPERATOR",
      });
    });
  } catch {
    res.status(500).json({
      message: "SOMETHING WENT WRONG",
    });
  }
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
