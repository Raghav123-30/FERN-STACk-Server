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
router.get("/getAllCrops", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const cropCollectionRef = collection(db, "Crop");
  try {
    await getDocs(cropCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            crop: doc.data().crop,
            mode: doc.data().mode,
            serviceCharge: doc.data().serviceCharge,
            trayCapacity: doc.data().trayCapacity,
            duration: doc.data().duration,
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
router.post("/deletecrop", async (req, res) => {
  const body = req.body;
  console.log(body);
  const docRef = doc(db, "Crop", body.id);
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

router.post("/updateTray", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const docRef = doc(db, "Location", body.id);
    await updateDoc(docRef, {
      numTrays: body.numTrays,
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
router.post("/setCropToLoc", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const docRef = doc(db, "Location", body.id);
    await updateDoc(docRef, {
      crop: body.crop,
      duration: body.duration,
      trayCapacity: body.trayCapacity,
      serviceCharge: body.serviceCharge,
      mode: body.mode,
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

router.post("/updatecrop", async (req, res) => {
  console.log(req);
  const body = req.body;
  console.log(body);

  try {
    const docRef = doc(db, "Crop", body.id);
    await updateDoc(docRef, {
      crop: body.crop,
      mode: body.mode,
      trayCapacity: body.trayCapacity,
      serviceCharge: body.serviceCharge,
      duration: body.duration,
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
router.get("/listcrop", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const cropCollectionRef = collection(db, "Crop");
  try {
    await getDocs(cropCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            crop: doc.data().crop,
            mode: doc.data().mode,
            trayCapacity: doc.data().trayCapacity,
            serviceCharge: doc.data().serviceCharge,
            duration: doc.data().duration,
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
router.post("/addcrop", async (req, res) => {
  const cropCollection = collection(db, "Crop");

  const body = req.body;
  console.log("Hi........");

  console.log(
    body.crop,
    body.mode,
    body.trayCapacity,
    body.serviceCharge,
    body.duration
  );
  try {
    await addDoc(cropCollection, {
      crop: body.crop,
      mode: body.mode,
      trayCapacity: body.trayCapacity,
      serviceCharge: body.serviceCharge,
      duration: body.duration,
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
router.get("/getAllGeography", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const geographyCollectionRef = collection(db, "geography");
  try {
    await getDocs(geographyCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            region: doc.data().region,
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
router.get("/getAllVillages", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const villageCollectionRef = collection(db, "village");
  try {
    await getDocs(villageCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            geographyId: doc.data().geographyid,
            village: doc.data().villageName,
            taluk: doc.data().taluk,
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
router.post("/addVillage", async function (req, res) {
  const body = req.body;
  const villageCollectionRef = collection(db, "village");
  try {
    await addDoc(villageCollectionRef, {
      geographyid: body.geographyId,
      taluk: body.taluk,
      villageName: body.village,
    }).then(() => {
      console.log("Added successfully");
      res.status(200).json({
        message: "SUCCESS",
        data: true,
      });
    });
  } catch {
    res.status(500).json({
      message: "FAILED",
      data: false,
    });
  }
});
router.post("/addGeography", async function (req, res) {
  const geographyCollectionRef = collection(db, "geography");
  const body = req.body;
  console.log(body);
  try {
    await addDoc(geographyCollectionRef, {
      region: body.region,
    }).then(() => {
      res.status(200).json({
        message: "SUCCESS",
        data: true,
      });
    });
  } catch {
    {
      console.log("failed");
      res.status(500).json({
        message: "FAILED",
        data: false,
      });
    }
  }
});
router.post("/addDryingCrop", async function (req, res) {
  const body = req.body;
  const cropListCollectionRef = collection(db, "villageCrops");

  try {
    await addDoc(cropListCollectionRef, {
      cropname: body.cropname,
      period: body.period,
      villageid: body.villageid,
      mode: body.mode,
    }).then(() => {
      console.log("hello");
      res.status(200).json({
        message: "SUCCESS",
        data: true,
      });
    });
  } catch {
    {
      console.log("failed");
      res.status(500).json({
        message: "FAILED",
        data: false,
      });
    }
  }
});
router.get("/getVillageCrops", async function (req, res) {
  console.log("Hi from API");
  const documents = [];
  const villageCropsCollectionRef = collection(db, "villageCrops");
  try {
    await getDocs(villageCropsCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            cropname: doc.data().cropname,
            mode: doc.data().mode,
            period: doc.data().period,
            villageid: doc.data().villageid,
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
router.post("/getVillageId", async function (req, res) {
  const docId = req.body.locationId;
  console.log(docId);
  const neededDoc = doc(db, "Location", docId);
  const data = await getDoc(neededDoc);
  if (data.exists()) {
    console.log(data);
    let villageId = data.data().villageId;
    console.log(villageId);
    res.status(200).json({
      message: "SUCCESS",
      data: villageId,
    });
  } else {
    res.status(500).json({
      message: "FAILED",
      data: "",
    });
  }
});
router.get("/getVillageAddress", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "village");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            geographyid: doc.data().geographyid,
            taluk: doc.data().taluk,
            villageName: doc.data().villageName,
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
router.get("/getGeographyAddress", async (req, res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "geography");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id: doc.id,
            region: doc.data().region,
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
