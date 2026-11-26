let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
        alert("Password must contain at least 6 characters and a number");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = users.find(
        (user) => user.email === email && user.password === password
    );
    if (loggedInUser) {
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );
        alert("Login Successful");
        window.location.href = "expense.html";
    } else {
        alert("Invalid Email or Password");
    }

});