fetch("http://localhost:5000/api/aptitude")
  .then(response => response.json())
  .then(data => {

      const container = document.getElementById("topicContainer");

      data.forEach(topic => {

          const card = document.createElement("div");
          card.classList.add("card");
          card.innerText = topic.topicName;

          card.onclick = () => {
              window.location.href =
              "topic.html?name=" + encodeURIComponent(topic.topicName);
          };

          container.appendChild(card);
      });

  })
  .catch(error => console.log(error));