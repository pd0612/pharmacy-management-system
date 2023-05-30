// const express = require("express");
// const app = express();
// const admin = require("firebase-admin");

// const firebaseConfig = {
//   apiKey: "AIzaSyDvd0aSq5baLfm7znloTe8VaCnN8Rz-YPE",
//   authDomain: "pharmacymanagement-59505.firebaseapp.com",
//   databaseURL: "https://pharmacymanagement-59505-default-rtdb.firebaseio.com",
//   projectId: "pharmacymanagement-59505",
//   storageBucket: "pharmacymanagement-59505.appspot.com",
//   messagingSenderId: "579613358388",
//   appId: "1:579613358388:web:802827035c787280e58d61",
//   measurementId: "G-YS9LE6J4CQ",
// };

// const port = 3005;
// app.use(express.json());
// admin.initializeApp(firebaseConfig);
// const db = admin.firestore();
// const usercol = db.collection("Pharmacy");
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// //basic complete data route
// app.get("/getMedicines", async (req, res) => {
//   try {
//     const usersSnapshot = await usercol.get();
//     const users = [];
//     usersSnapshot.forEach((doc) => {
//       users.push(doc.data());
//     });
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const PORT = 3003;

const serviceAccount = require("./serviceKey/servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const medicines = db.collection("medicines");

app.get("/allMedicines", async (req, res) => {
  try {
    const usersSnapshot = await medicines.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get users" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
