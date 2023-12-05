document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch("db2.json")
      .then((response) => response.json())
      .then((data) => {
        const cardContainer = document.getElementById("employeeCards");
        const searchBox = document.getElementById("searchBox");
        const dropdown = document.getElementById("list");
        const designationDropdown = document.getElementById("list1");
        const officeDropdown = document.getElementById("list3");
        const cardCount = document.getElementById("cardCount");
  
        // Function to create an employee card
        function createEmployeeCard(employee) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.setAttribute("data-dept", employee.dept);
          card.setAttribute("data-designation", employee.designation);
          card.setAttribute("data-outemail", employee.outemail);
          card.setAttribute("data-office", employee.office);
          card.setAttribute("data-spresponse", employee.spResponse);
  
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
  
          const officePara = document.createElement("p");
          officePara.textContent = `Office: ${employee.office}`;
  
          const spResponsePara = document.createElement("p");
          spResponsePara.textContent = `Assigned For: ${employee.spResponse}`;
  
          // Append elements to the card content
          cardContent.appendChild(photoImg);
          cardContent.appendChild(heading);
          cardContent.appendChild(deptPara);
          cardContent.appendChild(designationPara);
          cardContent.appendChild(extPara);
          cardContent.appendChild(officePara);
          cardContent.appendChild(spResponsePara);
  
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
  
        // Function to filter cards based on selected designation (case-sensitive exact match from the start to the end)
        function filterCardsByDesignation(selectedDesignation) {
          const cards = document.querySelectorAll(".card");
  
          cards.forEach((card) => {
            const designation = card.getAttribute("data-designation");
  
            // Check for case-sensitive exact match from the start to the end after trimming
            const isVisible =
              selectedDesignation === "all" || designation.trim() === selectedDesignation.trim();
  
            card.style.display = isVisible ? "block" : "none";
          });
  
          const visibleCards = document.querySelectorAll(".card[style='display: block;']");
          updateCardCount(visibleCards.length);
        }
  
        // Function to filter cards based on selected office
        function filterCardsByOffice(selectedOffice) {
          const cards = document.querySelectorAll(".card");
  
          cards.forEach((card) => {
            const office = card.getAttribute("data-office");
  
            const isVisible = selectedOffice === "all" || office === selectedOffice;
  
            card.style.display = isVisible ? "block" : "none";
          });
  
          const visibleCards = document.querySelectorAll(".card[style='display: block;']");
          updateCardCount(visibleCards.length);
        }
  
        // Function to filter cards based on search query
        function filterCardsBySearchQuery(query) {
          const selectedDept = dropdown.value.toLowerCase();
          const selectedDesignation = designationDropdown.value.toLowerCase();
          const selectedOffice = officeDropdown.value.toLowerCase();
          const cards = cardContainer.querySelectorAll(".card");
  
          let visibleCardCount = 0;
  
          cards.forEach((card) => {
            const employeeData = card.textContent.toLowerCase();
            const dept = card.getAttribute("data-dept").toLowerCase();
            const designation = card.getAttribute("data-designation").toLowerCase();
            const office = card.getAttribute("data-office").toLowerCase();
            const isVisible =
              (selectedDept === "all" || dept.includes(selectedDept)) &&
              (selectedDesignation === "all" || designation.includes(selectedDesignation)) &&
              (selectedOffice === "all" || office === selectedOffice) &&
              employeeData.includes(query);
  
            card.style.display = isVisible ? "block" : "none";
  
            if (isVisible) {
              visibleCardCount++;
            }
          });
  
          updateCardCount(visibleCardCount);
        }
  
        // Event listener for department dropdown change
        dropdown.addEventListener("change", function () {
          const selectedDept = dropdown.value;
          filterCardsByDepartment(selectedDept);
          updateCardVisibilityAndCount();
        });
  
        // Event listener for designation dropdown change
        designationDropdown.addEventListener("change", function () {
          const selectedDesignation = designationDropdown.value;
          filterCardsByDesignation(selectedDesignation);
          updateCardVisibilityAndCount();
        });
  
        // Event listener for office dropdown change
        officeDropdown.addEventListener("change", function () {
          const selectedOffice = officeDropdown.value;
          filterCardsByOffice(selectedOffice);
          updateCardVisibilityAndCount();
        });
  
        // Event listener for search box input
        searchBox.addEventListener("input", function () {
          const query = searchBox.value.toLowerCase();
          filterCardsBySearchQuery(query);
        });
  
        // Function to update card visibility and count
        function updateCardVisibilityAndCount() {
          const query = searchBox.value.toLowerCase();
          filterCardsBySearchQuery(query);
        }
  
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
  
  // Function to show or hide the mobile menu
  const toggle = () => {
    mobileMenu.classList.toggle("show");
  };
  
  // Function to add an 'active' class to the nav link
  const addActive = (array, activeLink) => {
    array.forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelector(`${activeLink}`).classList.remove("active");
        link.classList.add("active");
      });
    });
  };
  
  // Calling 'addActive()' for desktop nav
  // Calling 'addActive()' for desktop nav links
  addActive(navLinks, ".links li a.active");
  
  // Calling 'addActive()' for mobile nav links
  addActive(mobileNavLinks, "li.active");

  
  const images = document.querySelectorAll('.icon-container .icon');
  const dropdownList = document.getElementById("list");
  const dropdownList1 = document.getElementById("list1");
  const dropdownList3 = document.getElementById("list3");

  // Set 'active' class to the 1.png image initially
  images[0].classList.add("active");

  // Hide list1 and list3 initially
  dropdownList1.style.display = "none";
  dropdownList3.style.display = "none";

  images.forEach((image) => {
    image.addEventListener("click", function () {
      // Remove the 'active' class from all images
      images.forEach((img) => {
        img.classList.remove("active");
      });

      // Add the 'active' class to the clicked image
      image.classList.add("active");

      // Reset styles for all dropdowns
      dropdownList.style.display = "none";
      dropdownList1.style.display = "none";
      dropdownList3.style.display = "none";

      // Set the value of all dropdowns to "all"
      dropdownList.value = "all";
      dropdownList1.value = "all";
      dropdownList3.value = "all";

      // Determine which dropdown to show based on the clicked image
      if (image.src.includes("1.png")) {
        dropdownList.style.display = "block";
      } else if (image.src.includes("2.png")) {
        dropdownList1.style.display = "block";
      } else if (image.src.includes("3.png")) {
        dropdownList3.style.display = "block";
      }
    });
  });
