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
app.use(express.json());

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
app.post("/medicine", async (req, res) => {
  let newMedicine = req.body;
  let newName = newMedicine.medicineName; // Access the medicineName from the request body

  try {
    const querySnapshot = await medicines
      .where("medicineName", "==", newName)
      .get();
    if (querySnapshot.empty) {
      res.status(400).json({ message: "Medicine does not exist" });
    } else {
      const medicineData = [];
      querySnapshot.forEach((doc) => {
        medicineData.push(doc.data());
      });
      res.status(200).json(medicineData);
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/addMedicine", async (req, res) => {
  let newMedicine = req.body;
  let newName = newMedicine.medicineName; // Access the medicineName from the request body

  try {
    const querySnapshot = await medicines
      .where("medicineName", "==", newName)
      .get();

    if (querySnapshot.empty) {
      // If no matching documents found, add the new medicine to Firestore
      await medicines.add(newMedicine);
      return res.status(200).json({ message: "Medicine added successfully" });
    } else {
      return res.status(409).json({ message: "Medicine already exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add medicine" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
