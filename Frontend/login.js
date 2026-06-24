document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {

            // Save session
            localStorage.setItem("userLoggedIn", "true");

            // Save username
            localStorage.setItem("username", username);

            alert("Login Successful ✅");

            window.location.href = "index.html";

        } else {
            alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Error connecting to server");
    }
});