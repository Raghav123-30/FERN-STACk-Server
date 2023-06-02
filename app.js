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

app.get("/api/getAllCrops", async (req, res) => {
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
app.post("/api/deletecrop", async (req, res) => {
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
app.post("/api/deleteloc", async (req, res) => {
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
app.post("/api/deleteop", async (req, res) => {
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

app.post("/api/updateTray", async (req, res) => {
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
app.post("/api/setCropToLoc", async (req, res) => {
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
app.post("/api/updateop", async (req, res) => {
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
app.post("/api/updateloc", async (req, res) => {
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
app.post("/api/addproduct", async (req, res) => {
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
app.post("/api/updatecrop", async (req, res) => {
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
app.get("/api/listcrop", async (req, res) => {
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
app.post("/api/addcrop", async (req, res) => {
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
app.get("/api/getAllGeography", async (req, res) => {
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
app.get("/api/getAllVillages", async (req, res) => {
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
app.post("/api/addVillage", async function (req, res) {
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
app.post("/api/addGeography", async function (req, res) {
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
app.post("/api/addDryingCrop", async function (req, res) {
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
app.get("/api/getVillageCrops", async function (req, res) {
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
app.post("/api/getVillageId", async function (req, res) {
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
app.post("/api/addNewConfiguration", async function (req, res) {
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
app.get("/api/getLocationCrops", async (req, res) => {
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
app.post("/api/addNewCropSetup", async function (req, res) {
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
app.post("/api/updateConfiguration", async function (req, res) {
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
app.post("/api/getProductOrders", async function (req, res) {
  const locationId = req.body.id;
  console.log(locationId);
});
app.post("/api/fetchSetupDetails", async function (req, res) {
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
app.post("/api/getOrders", async function (req, res) {
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
app.post("/api/addloc", async (req, res) => {
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
app.post("/api/updateproduct", async (req, res) => {
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
app.get("/api/listproduct", async (req, res) => {
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
app.get("/api/getProductAddress", async (req, res) => {
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
app.get("/api/getGeographyAddress", async (req, res) => {
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
app.get("/api/getVillageAddress", async (req, res) => {
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
app.post("/api/deleteproduct", async (req, res) => {
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
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
