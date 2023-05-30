// Copy your Firebase config information here

// Copy your Firebase config information here

const firebaseConfig = {
  apiKey: "AIzaSyDvd0aSq5baLfm7znloTe8VaCnN8Rz-YPE",
  authDomain: "pharmacymanagement-59505.firebaseapp.com",
  databaseURL: "https://pharmacymanagement-59505-default-rtdb.firebaseio.com",
  projectId: "pharmacymanagement-59505",
  storageBucket: "pharmacymanagement-59505.appspot.com",
  messagingSenderId: "579613358388",
  appId: "1:579613358388:web:802827035c787280e58d61",
  measurementId: "G-YS9LE6J4CQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var medicineDB = firebase.database().ref("Pharmacy");

document.getElementById("medicineForm").addEventListener("submit", addMedicine);

function addMedicine(e) {
  e.preventDefault();

  var medicineName = getElementVal("medicineName");
  var companyName = getElementVal("companyName");
  var manufactureDate = getElementVal("manufactureDate");
  var expiryDate = getElementVal("expiryDate");
  var medicineType = getElementVal("medicineType");
  var price=getElementVal("price");
  var lot_no=getElementVal("lot_no");

  saveMedicine(medicineName, companyName, manufactureDate, expiryDate, medicineType,price,lot_no);

  // Enable alert
  document.querySelector(".alert").style.display = "block";

  // Remove the alert after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset the form
  document.getElementById("medicineForm").reset();
}

const saveMedicine = (medicineName, companyName, manufactureDate, expiryDate, medicineType,price,lot_no) => {
  var newMedicine = medicineDB.push();

  newMedicine.set({
    medicineName: medicineName,
    companyName: companyName,
    manufactureDate: manufactureDate,
    expiryDate: expiryDate,
    medicineType: medicineType,
    price:price,
    lot_no:lot_no,

  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
