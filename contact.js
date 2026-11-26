let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit",(e)=> {
    e.preventDefault();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");

    document.getElementById("name").addEventListener("input", function () {
        nameError.textContent = "";
    });

    document.getElementById("email").addEventListener("input", function () {
        emailError.textContent = "";
    });

    document.getElementById("message").addEventListener("input", function () {
        messageError.textContent = "";
    });

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let isValid = true;

    let nameRegex = /^[A-Za-z ]+$/;
    if (name === "") {
        nameError.textContent = "Please enter your name";
        nameError.style.color = "red";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        nameError.textContent = "Name must contain only letters and spaces";
        nameError.style.color = "red";
        isValid = false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailError.textContent = "Please enter your email";
        emailError.style.color = "red";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Enter a valid email";
        emailError.style.color = "red";
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter your message";
        messageError.style.color = "red";
        isValid = false;
    } else if (message.length < 10) {
        messageError.textContent = "Message must contain at least 10 characters";
        messageError.style.color = "red";
        isValid = false;
    }

    if (!isValid) {
        return;
    }
    emailjs.send("service_yekgf9q", "template_y1ksu76", {
        name: name,
        email: email,
        message: message
    }, "ZWlaxIjhf3dwKlKdY")

    .then(function () {
        alert("Message sent successfully!");
        contactForm.reset();
    })
    .catch(function (error) {
        console.log(error);
        alert("Message sending failed. Please try again.");
    });
});
