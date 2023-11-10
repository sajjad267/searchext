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
          card.appendChild(designationPara);
          card.appendChild(extPara);
  
          // Append the card to the container
          cardContainer.appendChild(card);
        }
          // Loop through the JSON data and create employee cards
          data.forEach(createEmployeeCard);

        // Function to update the card count
        function updateCardCount(count) {
          const cardCount = document.getElementById("cardCount");
          cardCount.textContent = count;
      }
  
  
        // Search functionality
        const searchBox = document.getElementById("searchBox");



        function updateCardVisibilityAndCount() {
          const query = searchBox.value.toLowerCase();
          const cards = cardContainer.querySelectorAll(".card");
  
          let visibleCardCount = 0;
  
          cards.forEach((card) => {
              const employeeData = card.textContent.toLowerCase();
              if (employeeData.includes(query)) {
                  card.style.display = "block";
                  visibleCardCount++;
              } else {
                  card.style.display = "none";
              }
          });
  
          updateCardCount(visibleCardCount);
      }

      
      searchBox.addEventListener("input", updateCardVisibilityAndCount);
      // Initially, update card count for all cards
    updateCardVisibilityAndCount();
      
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  



