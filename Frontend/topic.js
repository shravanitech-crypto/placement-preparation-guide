const urlParams = new URLSearchParams(window.location.search);
const topicName = urlParams.get("name");

// Set topic title
document.getElementById("topicTitle").innerText = topicName;

// Fetch dynamic topic content
fetch("http://localhost:5000/api/ai/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ topic: topicName })
})
.then(response => response.json())
.then(data => {

    // Hide loading text
    document.getElementById("loading").style.display = "none";

    // IMPORTANT: Use innerHTML instead of innerText
    document.getElementById("content").innerHTML = data.content;

})
.catch(error => {
    document.getElementById("loading").innerText = "Error generating content ❌";
    console.error("Frontend Error:", error);
});