document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON data
  fetch("db2.json")
      .then((response) => response.json())
      .then((data) => {
          const cardContainer = document.getElementById("employeeCards");
          const searchBox = document.getElementById("searchBox");
          const dropdown = document.getElementById("list");
          const cardCount = document.getElementById("cardCount");

          // Function to create an employee card
          function createEmployeeCard(employee) {
              const card = document.createElement("div");
              card.classList.add("card");
              card.setAttribute("data-dept", employee.dept);
              card.setAttribute("data-outemail", employee.outemail);

              const cardContent = document.createElement("div");
              cardContent.classList.add("card-content");

              const photoImg = document.createElement("img");
              photoImg.src = employee.photo;
              photoImg.alt = "Employee Photo";

              const heading = document.createElement("h2");
              heading.textContent = employee.name;

              const deptPara = document.createElement("p");
              deptPara.textContent = `Department: ${employee.dept}`;

              const extPara = document.createElement("p");
              extPara.textContent = `Ext: ${employee.ext}`;

              const designationPara = document.createElement("p");
              designationPara.textContent = `Designation: ${employee.designation}`;

              // Append elements to the card content
              cardContent.appendChild(photoImg);
              cardContent.appendChild(heading);
              cardContent.appendChild(deptPara);
              cardContent.appendChild(designationPara);
              cardContent.appendChild(extPara);

              // Append the card content to the card
              card.appendChild(cardContent);

              // Create the email logo container
              const emailLogoContainer = document.createElement("div");
              emailLogoContainer.classList.add("email-logo-container");

              // Create the email logo
              const emailLogo = document.createElement("img");
              emailLogo.src = "outlook.png"; // Replace with the actual path to your email logo
              emailLogo.alt = "Email Address";
              emailLogoContainer.appendChild(emailLogo);

              // Append the email logo container to the card
              card.appendChild(emailLogoContainer);

              // Append the card to the container
              cardContainer.appendChild(card);

              // Attach click event to email logo container
              emailLogoContainer.addEventListener("click", function () {
                  // Copy the outemail to the clipboard
                  navigator.clipboard.writeText(employee.outemail);

                  // Show a custom notification on the card
                  const notification = document.createElement("div");
                  notification.classList.add("custom-notification");
                  notification.textContent = "Email Copied!";
                  card.appendChild(notification);

                  // Remove the notification after a few seconds
                  setTimeout(() => {
                      card.removeChild(notification);
                  }, 3000);
              });
          }

          // Function to update the card count
          function updateCardCount(count) {
              cardCount.textContent = count;
          }
// Function to filter cards based on selected department
function filterCardsByDepartment(selectedDept) {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const dept = card.getAttribute("data-dept").toLowerCase();
        const lowercasedSelectedDept = selectedDept.toLowerCase();

        const isVisible = selectedDept === "all" || dept.includes(lowercasedSelectedDept);

        card.style.display = isVisible ? "block" : "none";
    });

    const visibleCards = document.querySelectorAll(".card[style='display: block;']");
    updateCardCount(visibleCards.length);
}










          // Event listener for dropdown change
          dropdown.addEventListener("change", function () {
              const selectedDept = dropdown.value;
              filterCardsByDepartment(selectedDept);
              updateCardVisibilityAndCount(); // Update search box based on the selected department
          });

          // Function to update card visibility and count
function updateCardVisibilityAndCount() {
    const query = searchBox.value.toLowerCase();
    const selectedDept = dropdown.value.toLowerCase();
    const cards = cardContainer.querySelectorAll(".card");

    let visibleCardCount = 0;

    cards.forEach((card) => {
        const employeeData = card.textContent.toLowerCase();
        const dept = card.getAttribute("data-dept").toLowerCase();
        const isVisible = (selectedDept === "all" || dept.includes(selectedDept)) && employeeData.includes(query);

        card.style.display = isVisible ? "block" : "none";

        if (isVisible) {
            visibleCardCount++;
        }
    });

    updateCardCount(visibleCardCount);
}

          // Event listener for search box input
          searchBox.addEventListener("input", updateCardVisibilityAndCount);

          // Loop through the JSON data and create employee cards
          data.forEach(createEmployeeCard);

          // Initially, filter cards based on the selected department
          filterCardsByDepartment(dropdown.value);
      })
      .catch((error) => console.error("Error fetching data:", error));
});











const mobileMenu = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".links li a");
const mobileNavLinks = mobileMenu.querySelectorAll("li");

//function to show or hide the mobile menu
const toggle = () => {
  //toggle 'show' class on mobile menu
  mobileMenu.classList.toggle("show");
};

//function to add an 'active' class to the nav link
const addActive = (array, activeLink) => {
  //looping through the links
  array.forEach((link) => {
    //adding an event listener to the link
    link.addEventListener("click", () => {
      //removing 'active' class from the current active link
      document.querySelector(`${activeLink}`).classList.remove("active");
      //adding an 'active' class to the clicked link
      link.classList.add("active");
    });
  });
};

//calling 'addActive()' for desktop nav links
addActive(navLinks, ".links li a.active");

//calling 'addActive()' for mobile nav links
addActive(mobileNavLinks, "li.active");
