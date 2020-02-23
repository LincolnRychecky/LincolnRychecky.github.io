  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDZkphKGDOGFqEShcoySi39tFB7BtAR0CY",
    authDomain: "invasive-species-reporter.firebaseapp.com",
    databaseURL: "https://invasive-species-reporter.firebaseio.com",
    projectId: "invasive-species-reporter",
    storageBucket: "invasive-species-reporter.appspot.com",
    messagingSenderId: "198911272608",
    appId: "1:198911272608:web:595d186746e2b1f94ccbc5",
    measurementId: "G-4571BBW3QX"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig); //creating instance of firebase
  // Get a reference to the database
var database = firebase.firestore();
var docRef = database.collection("Aquatics Reports");

var selectedFish = "Zebra Mussel";


function getNameFromClick(fishName){
  console.log("Hello");
  localStorage.setItem('selectedFish',fishName);
  window.location.href = "specificFish.html";
}
function display_Name(name) {
  document.getElementById("Species Name").innerHTML = name;
}
function display_Description(description) {
  document.getElementById("Species Description").innerHTML = description;
}
function display_Problem(problem) {
  document.getElementById("Problem").innerHTML = problem;
}
function display_waterSheds(waterSheds) {
  document.getElementById("Water Sheds").innerHTML = waterSheds;
}

function GFG_Fun(image) {
  var img = document.createElement("img");
  img.src = image;
  var src = document.getElementById("header");
  src.appendChild(img);
}

function findFish()
{
console.log("We entered find fish:");
  database.collection("InvasiveSpeciesEntries").get().then(function(querySnapshot)
  {querySnapshot.forEach(function(doc){
    if(doc.exists && doc.data().name == localStorage.getItem('selectedFish'))
    {
      console.log("Document data:", doc.data());
      var post = doc.data();
      var name = post.name;
      var description = post.description;
      var problem = post.problem;
      var waterSheds = post.waterSheds;
      var image = post.image;

      display_Name(name);
      display_Description(description);
      display_Problem(problem);
      display_waterSheds(waterSheds);
      GFG_Fun(image);

    }

    });
  });

}

function submitClick(){

    database.collection("Aquatics Reports").add({
        email: document.getElementById("email").value,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        contact: document.getElementById("yes").checked,
        coordinates: document.getElementById("coordinates").value,
        specificLoc: document.getElementById("specifics").value,
        waterBody: document.getElementById("waterBody").value,
        species: document.getElementById("species").value,
        description: document.getElementById("description").value,

    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function loadTable(){
  var num = 0;
  console.log("We entered loadTable");
    database.collection("Aquatics Reports").get().then(function(querySnapshot)
    {querySnapshot.forEach(function(doc){
      if(doc.exists)
      {
        console.log("Document data:", doc.data());
        var tab1 = document.getElementById("table1");
        var post = doc.data();
        var row = tab1.insertRow(num);
        var celli = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        cell1.innerHTML = post.species;
        cell2.innerHTML = post.date;
        cell3.innerHTML = post.waterBody;
        celli.innerHTML = num;
        num = num + 1;

      }

      });
    });
}
