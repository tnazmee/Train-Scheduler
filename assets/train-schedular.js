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


$("#submit-button").on("click", function (event) {
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


database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var empName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().destination;
  var empTime = childSnapshot.val().time;
  var empFrequency = childSnapshot.val().frequency;

  console.log(empName);
  console.log(empDestination);
  console.log(empTime);
  console.log(empFrequency);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(empTime, "X").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % empFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = empFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Formatting Next Arrival into "hh:mm"
  var nextArrival = moment(nextTrain).format("LT");

  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empDestination),
    $("<td>").text(empFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesTillTrain),
  );

  $("#train-table > tbody").append(newRow);
});