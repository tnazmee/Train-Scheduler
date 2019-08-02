var config = {
  apiKey: "AIzaSyBehThb2Xvh5EjvLqDTQoai6ddaMU0K9oU",
  authDomain: "train-877ba.firebaseapp.com",
  databaseURL: "https://train-877ba.firebaseio.com",
  projectId: "train-877ba",
  storageBucket: "",
  messagingSenderId: "379546165461",
  appId: "1:379546165461:web:7106bf03c6ad5d51"
};
  
firebase.initializeApp(config);
var database = firebase.database();
  

$("#submit-button").on("click", function(event) {
  event.preventDefault();

  var empName = $("#train-name-input").val().trim();
  var empDestination = $("#destination-input").val().trim();
  var empTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var empFrequency = $("#frequency-input").val().trim();
  
    
  var addTrain = {
    name: empName,
    destination: empDestination,
    time: empTime,
    frequency: empFrequency
  };
  
  database.ref().push(addTrain);
  
    
  console.log(addTrain.name);
  console.log(addTrain.destination);
  console.log(addTrain.time);
  console.log(addTrain.frequency);
  
    
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  return false;
});
  

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
  var empName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().destination;
  var empTime = childSnapshot.val().time;
  var empFrequency = childSnapshot.val().frequency;
   
  console.log(empName);
  console.log(empDestination);
  console.log(empTime);
  console.log(empFrequency);
  
    
  var convertTime = moment(empTime, "HH:mm").subtract(1, "years");
  /*
  var currentTime = moment();
  console.log("Current time: " + moment(currentTime).format("HH:mm"));
  */
  var diffTime = moment().diff(moment(convertTime), "minutes");
  var timeApart = diffTime % empFrequency;
  var remainingTime = empFrequency - timeApart;
  var arrivalTime = moment().add(remainingTime, "minutes");
  var nextArrival = moment(arrivalTime).format("HH:mm");
   
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empDestination),
    $("<td>").text(empFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(remainingTime),
  );
  
  $("#train-table > tbody").append(newRow);
});


