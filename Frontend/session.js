// Function to check login before opening any page
function checkLogin(page) {

    const loggedIn = localStorage.getItem("userLoggedIn");

    if (!loggedIn) {
        alert("Please signup or login first");
        window.location.href = "signup.html";
        return;
    }

    window.location.href = page;
}


// Handle navbar session
document.addEventListener("DOMContentLoaded", function(){

    const loggedIn = localStorage.getItem("userLoggedIn");
    const username = localStorage.getItem("username");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const welcomeUser = document.getElementById("welcomeUser");


    // If user is logged in
    if (loggedIn === "true") {

        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";

        if (welcomeUser) {
            welcomeUser.style.display = "inline";
            welcomeUser.innerText = "Hey, " + (username || "User");
        }

        if (logoutBtn) logoutBtn.style.display = "inline";
    }


    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(){

            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("username");

            alert("Logged out successfully");

            window.location.href = "index.html";
        });
    }

});