var wins = 0;
var ties = 0;
var loses = 0;

var playerOneSelection = [];
var playerTwoSelection = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWc1MdTtoY8RkmuBYdNxseWeHS_JJu7SM",
    authDomain: "rps-mulitplayer-b52a3.firebaseapp.com",
    databaseURL: "https://rps-mulitplayer-b52a3.firebaseio.com",
    projectId: "rps-mulitplayer-b52a3",
    storageBucket: "rps-mulitplayer-b52a3.appspot.com",
    messagingSenderId: "769507264709"
};
firebase.initializeApp(config);

var database = firebase.database();

var nameOne = "";
var nameTwo = "";
var userSelection = "";

//Player one
$(document).on("click", "#add-user", function (event) {
    event.preventDefault();

    nameOne = $("#username-input").val().trim();

    //push to local storage
    localStorage.clear();
    localStorage.setItem("name", nameOne);

    //push to firebase
    var userRef = database.ref("/" + nameOne);

});

database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
    var object = {};
    object[nameOne] = snapshot.val()[nameOne].userSelection
    console.log(object);
    console.log(snapshot.val()[nameOne].userSelection);

    //update hmtl page
    $("#playerOne").append(nameOne);

}, function (errorObject) {
    console.log("Erros handled: " + errorObject.code);
});
$(".rpsBtn").on("click", function () {
    alert("this works");
    userSelection = $(this).data("name");
    localStorage.setItem("userSelection", userSelection);
    database.ref("/" + nameOne + "/userSelection").set(userSelection);


});
database.ref().on("value", function (snapshot) {
    playerOneSelection.push(snapshot.val()[nameOne].userSelection);
    $("#playerOneSelection").append(snapshot.val()[nameOne].userSelection);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject);
})


// playing the actual game


if ((playerOneSelection === "rock") || (playerOneSelection === "paper") || (playerOneSelection === "scissors")) {


    if ((playerOneSelection === "rock") && (playerTwoSelection === "paper")) {
        loses++
    } else if ((playerOneSelection === "rock") && (playerTwoSelection === "scissors")) {
        wins++
    } else if ((playerOneSelection === "paper") && (playerTwoSelection === "rock")) {
        wins++
    } else if ((playerOneSelection === "paper") && (playerTwoSelection === "scissors")) {
        loses++
    } else if ((playerOneSelection === "scissors") && (playerTwoSelection == "rock")) {
        loses++
    } else if ((playerOneSelection === "scissors") && (playerTwoSelection === "paper")) {
        wins++
    } else if (playerOneSelection === playerTwoSelection) {
        ties++
    }
}