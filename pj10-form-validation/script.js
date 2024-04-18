const form = document.getElementById("form");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");
const messageContainer = document.getElementById("message-container");
const message = document.getElementById("message");

let isValid = false;
let passwordsMatch = false;

const storeFormData = () => {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        confirmPassword: form["confirm-password"].value
    };

    console.log(user);
};

const validateFormData = () => {
    isValid = form.checkValidity();

    if (!isValid) {
        message.textContent = "Please fill out all the fields!";
        message.style.color = "#dc4c64";
        messageContainer.style.border = "3px solid #dc4c64";
        return;
    }

    if (passwordEl.value === confirmPasswordEl.value) {
        passwordsMatch = true;
        passwordEl.style.borderColor = "#14a44d";
        confirmPasswordEl.style.borderColor = "#14a44d";
    } else {
        passwordsMatch = false;
        message.textContent = "Passwords don't match!";
        message.style.color = "#dc4c64";
        messageContainer.style.border = "3px solid #dc4c64";
        passwordEl.style.borderColor = "#dc4c64";
        confirmPasswordEl.style.borderColor = "#dc4c64";
        return;
    }

    if (isValid && passwordsMatch) {
        message.textContent = "Registration Success!";
        message.style.color = "#14a44a";
        messageContainer.style.border = "3px solid #14a44a";
    }
};

const formSubmitHandler = (event) => {
    event.preventDefault();

    validateFormData();

    if (!isValid && passwordsMatch) {
        storeFormData();
    }
};

form.addEventListener("submit", formSubmitHandler);