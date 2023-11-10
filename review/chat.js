document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch("db2.json")
      .then((response) => response.json())
      .then((data) => {
        // Get the container where cards will be displayed
        const cardContainer = document.getElementById("employeeCards");
  
        // Function to create an employee card
        function createEmployeeCard(employee) {
          // Create a card element
          const card = document.createElement("div");
          card.classList.add("card");
  
          // Create an image element for the photo
          const photoImg = document.createElement("img");
          photoImg.src = employee.photo;
          photoImg.alt = "Employee Photo";
  
          // Create heading element for the name
          const heading = document.createElement("h2");
          heading.textContent = employee.name;
  
          // Create paragraph elements for other information
          const deptPara = document.createElement("p");
          deptPara.textContent = `Department: ${employee.dept}`;
  
          const extPara = document.createElement("p");
          extPara.textContent = `Ext: ${employee.ext}`;
  
          const designationPara = document.createElement("p");
          designationPara.textContent = `Designation: ${employee.designation}`;
  
          // Append elements to the card
          card.appendChild(photoImg);
          card.appendChild(heading);
          card.appendChild(deptPara);
          card.appendChild(extPara);
          card.appendChild(designationPara);
  
          // Append the card to the container
          cardContainer.appendChild(card);
        }
  
        // Loop through the JSON data and create employee cards
        data.forEach(createEmployeeCard);
  
        // Search functionality
        const searchBox = document.getElementById("searchBox");
        searchBox.addEventListener("input", function () {
          const query = searchBox.value.toLowerCase();
          const cards = cardContainer.querySelectorAll(".card");
  
          cards.forEach((card) => {
            const employeeData = card.textContent.toLowerCase();
            if (employeeData.includes(query)) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  