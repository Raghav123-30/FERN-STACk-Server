const bodyParser = require("body-parser");
const express = require("express");
const {db} = require("./firebase") 
const {getDocs, collection} = require("firebase/firestore");
const app = express();

const submitHandler = require("./submit");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

console.log(submitHandler);

app.post("/api/submit", (req, res) => {
  console.log(req.body);
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from express" });
});


app.get("/api/listowners", async (req, res) =>{
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
            cost:doc.data().cost
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
app.get('/api/getAllAddress', async(req,res) => {
  console.log("Hi from API");
  const documents = [];
  const operatorCollectionRef = collection(db, "Location");
  try {
    await getDocs(operatorCollectionRef)
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          const document = {
            id : doc.id,
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
})
app.post('/api/addloc',async(req,res)=>{
    const operatorCollection = collection(db,'Location');
        const body = JSON.parse(req.body);
        try{
            await addDoc(operatorCollection,{
                location: body.location,
                owner : body.owner,
                phoneno : body.phoneno,
                adhar: body.adhar
            }).then(() => {
                res.status(200).json({
                    message :'SUCCESS'
                })
            })
        }catch(error){
            res.status(500).json({
                message : 'FAILED'
            })
        }
    }
)
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
app.post('/api/deleteop',async(req,res) => {
    const body = JSON.parse(req.body);
        const id = body.id;
        const docRef = doc(db, "Operator", body.id);
        try{
            await deleteDoc(docRef).then(() => {
                res.status(200).json({
                    message :'SUCCESSFULLY DELETED THE OPERATOR'
                })
            })
        }catch{
            res.status(500).json({
                message : "SOMETHING WENT WRONG"
            })
        }
})
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
