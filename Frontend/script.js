document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");
    if (!registerForm) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const fullNameRegex = /^[A-Za-z\s]{3,}$/;

    // =========================
    // FULL NAME
    // =========================
    document.getElementById("fullName").addEventListener("input", function () {

        const value = this.value.trim();

        if (!value) {
            showError("fullName", "Full Name is required");
            return;
        }

        if (!fullNameRegex.test(value)) {
            showError("fullName", "Name must contain only letters (min 3)");
            return;
        }

        removeError("fullName");
    });


    // =========================
    // EMAIL
    // =========================
    document.getElementById("email").addEventListener("input", function () {
        validateField("email", emailRegex, "Invalid email format");
    });


    // =========================
    // MOBILE
    // =========================
    document.getElementById("mobile").addEventListener("input", function () {

        const input = document.getElementById("mobile");

        input.value = input.value.replace(/\D/g, "").slice(0, 10);

        validateField("mobile", mobileRegex, "Enter valid 10-digit mobile number");
    });


    // =========================
    // USERNAME
    // =========================
    document.getElementById("username").addEventListener("input", function () {

        const username = this.value.trim();

        if (!username) {
            showError("username", "Username is required");
            return;
        }

        if (username.includes("@")) {
            showError("username", "Username should not contain @");
            return;
        }

        if (!usernameRegex.test(username)) {
            showError("username", "Only letters, numbers and underscore allowed");
            return;
        }

        removeError("username");
    });


    // =========================
    // PASSWORD
    // =========================
    document.getElementById("password").addEventListener("input", function () {

        const password = this.value.trim();

        if (!password) {
            showError("password", "Password is required");
            return;
        }

        if (password.length < 6) {
            showError("password", "Password must be at least 6 characters");
            return;
        }

        removeError("password");
    });


    // =========================
    // CONFIRM PASSWORD
    // =========================
    document.getElementById("confirmPassword").addEventListener("input", function () {

        const password = document.getElementById("password").value.trim();
        const confirmPassword = this.value.trim();

        if (confirmPassword !== password) {
            showError("confirmPassword", "Passwords do not match");
            return;
        }

        removeError("confirmPassword");
    });


    // =========================
    // FORM SUBMIT
    // =========================
    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        let isValid = true;
        clearErrors();

        if (!validateField("email", emailRegex, "Invalid email format")) isValid = false;
        if (!validateField("mobile", mobileRegex, "Enter valid 10-digit mobile number")) isValid = false;

        const fullName = document.getElementById("fullName").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!fullNameRegex.test(fullName)) {
            showError("fullName", "Enter valid full name");
            isValid = false;
        }

        if (!usernameRegex.test(username) || username.includes("@")) {
            showError("username", "Enter valid username");
            isValid = false;
        }

        if (password.length < 6) {
            showError("password", "Password must be at least 6 characters");
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError("confirmPassword", "Passwords do not match");
            isValid = false;
        }

        const department = document.getElementById("department").value;
        const year = document.getElementById("year").value;

        if (!department) {
            showError("department", "Select department");
            isValid = false;
        }

        if (!year) {
            showError("year", "Select year");
            isValid = false;
        }

        if (!isValid) return;

        const data = {
            fullName,
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            department,
            year,
            username,
            password
        };

        try {

            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                registerForm.reset();
                alert("Registration Successful ✅ Please Login");
                window.location.href = "login.html";
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error("Registration Error:", error);
            alert("Error connecting to server");
        }

    });


    // =========================
    // HELPER FUNCTIONS
    // =========================

    function validateField(field, regex, message) {

        const input = document.getElementById(field);
        const value = input.value.trim();

        if (!value || !regex.test(value)) {
            showError(field, message);
            return false;
        }

        removeError(field);
        return true;
    }

    function showError(field, message) {
        document.getElementById(field + "Error").innerText = message;
        document.getElementById(field).classList.add("error-border");
    }

    function removeError(field) {
        document.getElementById(field + "Error").innerText = "";
        document.getElementById(field).classList.remove("error-border");
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.innerText = "");
        document.querySelectorAll("input, select").forEach(el => el.classList.remove("error-border"));
    }

});