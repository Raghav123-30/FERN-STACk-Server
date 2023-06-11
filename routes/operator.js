const express = require("express");
const { db } = require("../firebase");
const router = express.Router();
const {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} = require("firebase/firestore");
router.get("/listop", async (req, res) => {
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

router.post("/addop", async (req, res) => {
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
      locationId: body.locationId,
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
router.post("/deleteop", async (req, res) => {
  const body = req.body;
  console.log(body);
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
router.post("/updateop", async (req, res) => {
  const body = req.body;
  console.log(body.fullName, body.address, body.phone, body.adhar);
  try {
    const docRef = doc(db, "Operator", body.id);

    await updateDoc(docRef, {
      fullName: body.fullName,
      address: body.address,
      phone: body.phone,
      adharNumber: body.adhar,
    }).then(() => {
      console.log("success");
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch (error) {
    console.log("Failed for some reason");
    res.status(500).json({
      message: "FAILED",
    });
  }
});
module.exports = router;
