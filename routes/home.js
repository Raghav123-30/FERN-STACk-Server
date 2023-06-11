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
router.post("/getProductOrders", async function (req, res) {
  const locationId = req.body.id;
  console.log(locationId);
});
router.post("/fetchSetupDetails", async function (req, res) {
  console.log("Hi from API");
  const body = req.body;
  const locationId = body.locationId;

  try {
    const locationDocRef = doc(db, "Location", locationId);
    const locationData = await getDoc(locationDocRef);
    if (locationData.exists()) {
      const productId = locationData.data().productId;
      if (productId) {
        const productDocRef = doc(db, "Product", productId);
        const productData = await getDoc(productDocRef);
        if (productData.exists()) {
          const productName = productData.data().productName;
          const rack = productData.data().rack;
          const layers = productData.data().section;
          const trays = productData.data().tray;
          res.status(200).json({
            message: "SUCCESS",
            data: {
              productName: productName,
              rack: rack,
              layers: layers,
              trays: trays,
            },
          });
        }
      }
    }
  } catch {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.post("/getOrders", async function (req, res) {
  const locationId = req.body.locationId;
  console.log(locationId);
  const documents = [];
  try {
    const ordersCollection = collection(db, "New Booking");
    await getDocs(ordersCollection).then((snapshots) => {
      snapshots.forEach((doc) => {
        const document = {
          colorcode: doc.data().colorcode,
          farmername: doc.data().farmername,
          farmeraddress: doc.data().farmeraddress,
          farmerphone: doc.data().farmerphone,
          selectedmode: doc.data().selectedmode,
          trayallocation: doc.data().trayallocation,
          totalnumberoftrays: doc.data().totalnumneroftrays,
          selectedcrop: doc.data().selectedcrop,
          dateofarrival: doc.data().dateofarrival,
          dateofdispatch: doc.data().dateofdispatch,
          locationId: doc.data().locationid,
          status: doc.data().status,
        };
        if (
          document.status == 1 &&
          document.selectedmode == "Drying" &&
          document.locationId == locationId
        ) {
          console.log(document);
          documents.push(document);
        }
      });
      res.status(200).json({
        message: "SUCCESS",
        data: documents,
      });
    });
  } catch {
    console.log("failed");
  }
});

module.exports = router;
