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
router.get("/listowners", async (req, res) => {
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
            address: doc.data().address,
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
router.get("/getAllAddress", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Location");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            numTrays: doc.data().numTrays,
            location: doc.data().address,
            numTrays: doc.data().numTrays,
            crop: doc.data().crop,
            mode: doc.data().mode,
            duration: doc.data().duration,
            trayCapacity: doc.data().trayCapacity,
            serviceCharge: doc.data().serviceCharge,
            configured: doc.data().configured,
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
router.post("/deleteloc", async (req, res) => {
  const body = req.body;
  console.log(body);
  const docRef = doc(db, "Location", body.id);
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
router.post("/updateloc", async (req, res) => {
  const body = req.body;
  console.log(req.body);
  console.log(body.owner, body.address, body.phoneno, body.adhar);
  try {
    const docRef = doc(db, "Location", body.id);

    await updateDoc(docRef, {
      owner: body.owner,
      address: body.address,
      phoneno: body.phoneno,
      adhar: body.adhar,
    }).then(() => {
      console.log("success");
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch (error) {
    console.log("Failed for some reason here");
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.post("/addNewConfiguration", async function (req, res) {
  const crops = req.body.crops;
  const locationId = req.body.locationId;
  const CropCollectionRef = collection(db, "Crop_List");
  try {
    crops.forEach(async (item) => {
      console.log(item);
      await addDoc(CropCollectionRef, {
        locationid: locationId,
        mode: item.mode,
        cropname: item.cropname,
        period: parseInt(item.period),
        pertraycapacity: parseInt(item.perTrayCapacity),
      });
    });
    const neededDoc = doc(db, "Location", locationId);
    await updateDoc(neededDoc, {
      configured: true,
    });
    res.status(200).json({
      message: "SUCCESS",
    });
  } catch {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.get("/getLocationCrops", async (req, res) => {
  console.log("Hello from API");
  const CropCollectionRef = collection(db, "Crop_List");
  const documents = [];
  try {
    await getDocs(CropCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            cropname: doc.data().cropname,
            mode: doc.data().mode,
            period: doc.data().period,
            pertraycapacity: doc.data().pertraycapacity,
            locationid: doc.data().locationid,
          };
          console.log(document);
          documents.push(document);
        });
      })
      .then(() => {
        console.log("getting crops was success");
        res.status(200).json({
          message: "SUCCESS",
          data: documents,
        });
      });
  } catch (error) {
    console.log("failed");
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.post("/addNewCropSetup", async function (req, res) {
  const body = req.body;
  console.log(body);
  const cropListCollectionRef = collection(db, "Crop_List");
  try {
    await addDoc(cropListCollectionRef, {
      locationid: body.locationId,
      cropname: body.cropname,
      mode: body.mode,
      period: body.period,
      pertraycapacity: body.pertraycapacity,
    }).then(() => {
      res.status(200).json({
        message: "SUCCESS",
      });
    });
  } catch {
    console.log("failed");
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.post("/updateConfiguration", async function (req, res) {
  console.log("Hi from Api");
  try {
    const crops = req.body.crops;
    const locationId = req.body.locationId;
    console.log(crops);
    console.log(locationId);
    crops.forEach(async (item) => {
      const document = doc(db, "Crop_List", item.id);
      await updateDoc(document, {
        cropname: item.cropname,
        mode: item.mode,
        period: parseInt(item.period),
        pertraycapacity: parseInt(item.pertraycapacity),
      });
    });
    res.status(200).json({
      message: "SUCCESS",
    });
  } catch {
    res.status(500).json({
      message: "FAILED",
    });
  }
});
router.post("/addloc", async (req, res) => {
  const ownerCollection = collection(db, "Location");
  const body = req.body;
  console.log(body);

  try {
    await addDoc(ownerCollection, {
      address: body.address,
      owner: body.fullName,
      phoneno: body.phone,
      adhar: body.adhar,
      productId: body.productId,
      geographyId: body.geographyId,
      villageId: body.villageId,
      configured: body.configured,
      homeAddress: body.homeAddress,
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
module.exports = router;
