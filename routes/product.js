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
router.post("/addproduct", async (req, res) => {
  const operatorCollection = collection(db, "Product");

  const body = req.body;
  console.log("Hi........");
  console.log(body.id, body.productName, body.rack, body.section, body.tray);
  try {
    await addDoc(operatorCollection, {
      productName: body.productName,
      rack: body.rack,
      section: body.section,
      tray: body.tray,
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
router.post("/deleteproduct", async (req, res) => {
  const body = req.body;
  console.log(body);
  const docRef = doc(db, "Product", body.id);
  try {
    await deleteDoc(docRef).then(() => {
      res.status(200).json({
        message: "SUCCESSFULLY DELETED THE A3S Product",
      });
    });
  } catch {
    res.status(500).json({
      message: "SOMETHING WENT WRONG",
    });
  }
});
router.get("/getProductAddress", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Product");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            productName: doc.data().productName,
            rack: doc.data().rack,
            section: doc.data().section,
            tray: doc.data().tray,
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
router.post("/updateproduct", async (req, res) => {
  console.log(req);
  const body = req.body;
  console.log(body);

  try {
    const docRef = doc(db, "Product", body.id);
    await updateDoc(docRef, {
      productName: body.productName,
      rack: body.rack,
      section: body.section,
      tray: body.tray,
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
router.get("/listproduct", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Product");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            productName: doc.data().productName,
            rack: doc.data().rack,
            section: doc.data().section,
            tray: doc.data().tray,
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

module.exports = router;
