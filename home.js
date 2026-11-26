// let registerNav = document.getElementById("registerNav");
// let loginNav = document.getElementById("loginNav");
// let welcomeNav = document.getElementById("welcomeNav");
// let welcomeUser = document.getElementById("welcomeUser");
// let logoutNav = document.getElementById("logoutNav");
// let logoutBtn = document.getElementById("logoutBtn");

// let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// if (loggedInUser) {
//     registerNav.style.display = "none";
//     loginNav.style.display = "none";
//     welcomeNav.style.display = "block";
//     welcomeUser.textContent = "Welcome, " + loggedInUser.name;

//     logoutNav.style.display = "block";
// } else {
//     registerNav.style.display = "block";
//     loginNav.style.display = "block";
//     welcomeNav.style.display = "none";
//     logoutNav.style.display = "none";
// }
// logoutBtn.addEventListener("click", function () {

//     localStorage.removeItem("loggedInUser");
//     alert("Logout Successful");
//     window.location.href = "home.html";
// });

let registerNav = document.getElementById("registerNav");
let loginNav = document.getElementById("loginNav");
let welcomeNav = document.getElementById("welcomeNav");
let welcomeUser = document.getElementById("welcomeUser");
let logoutNav = document.getElementById("logoutNav");
let logoutBtn = document.getElementById("logoutBtn");
let expenseBtn = document.getElementById("expenseBtn");

// Get logged-in user
let loggedInUser = JSON.parse(
localStorage.getItem("loggedInUser")
);

// Check login status
if (loggedInUser) {

registerNav.style.display = "none";
loginNav.style.display = "none";

welcomeNav.style.display = "block";
welcomeUser.textContent = "Welcome, " + loggedInUser.name;

logoutNav.style.display = "block";

// Show Expense Tracker button
expenseBtn.style.display = "block";

} else {

registerNav.style.display = "block";
loginNav.style.display = "block";

welcomeNav.style.display = "none";
logoutNav.style.display = "none";

// Hide Expense Tracker button
expenseBtn.style.display = "none";

}

// Logout
if (logoutBtn) {

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("loggedInUser");

    alert("Logout Successful");

    window.location.href = "home.html";

}
)}
