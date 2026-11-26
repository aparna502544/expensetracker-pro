let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");
    let confirmError = document.getElementById("confirmError");

    document.getElementById("name").addEventListener("input", function () {
        nameError.textContent = "";
    });
    document.getElementById("email").addEventListener("input", function () {
        emailError.textContent = "";
    });
    document.getElementById("password").addEventListener("input", function () {
        passError.textContent = "";
    });
    document.getElementById("confirmPassword").addEventListener("input", function () {
        confirmError.textContent = "";
    });

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let isValid = true;
    let nameRegex = /^[A-Za-z ]+$/;

    if (name === "") {
        nameError.textContent = "Name is Required";
        nameError.style.color = "red";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        nameError.textContent = "Name must contain only letters and spaces";
        isValid = false;
    }
    if (email === "") {
        emailError.textContent= "Email is required";
        emailError.style.color = "red";
        isValid = false; 
    }
    if (password === "") {
        passError.textContent= "Password is required";
        passError.style.color = "red";
        isValid = false;
    }

    if (confirmPassword === "") {
        confirmError.textContent="Confirm your password";
        confirmError.style.color = "red";
        return;
    }

    if (!isValid) {
    return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent= "Enter a valid email";
        return;
    }

    if (password !== confirmPassword) {
    confirmError= "Passwords do not match!";
    isValid = false;
    }
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        passError.textContent= "Password must contain at least 6 characters, one letter and one number";
        return;
    }

    let existingUser = users.find(function (user) {
        return user.email === email;
    });
    
    if (existingUser) {
        alert("Email already registered!");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successfully completed");
    window.location.href = "login.html";
});
