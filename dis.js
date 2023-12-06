document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON data
  fetch("db3.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from JSON:", data);

      const tableBody = document.querySelector("#dataTable tbody");
      const searchBox = document.getElementById("inputField");
      const cardCount = document.getElementById("cardCount");
      const categoryDropdown = document.getElementById("list");

      // Function to create a table row
      function createTableRow(dataItem) {
        const row = document.createElement("tr");

        function createTableCell(text, width, align) {
          const cell = document.createElement("td");
          cell.textContent = text;
          cell.style.width = width;
          cell.style.textAlign = align || "left";
          return cell;
        }

        row.style.padding = "5px";

        const toCell = createTableCell(dataItem.to, "15%", "center");
        const ccCell = createTableCell(dataItem.cc, "15%", "center");

        // Add click event to copy the email and temporarily change the text
        toCell.addEventListener("click", function () {
          copyToClipboardAndShowNotification(toCell, dataItem.to);
        });

        ccCell.addEventListener("click", function () {
          copyToClipboardAndShowNotification(ccCell, dataItem.cc);
        });

        row.appendChild(createTableCell(dataItem.category, "10%", "center"));
        row.appendChild(createTableCell(dataItem.details, "45%", "left"));
        row.appendChild(toCell);
        row.appendChild(ccCell);
        row.appendChild(createTableCell(dataItem.conConcerns, "15%", "center"));

        tableBody.appendChild(row);
      }

      // Function to update the row count
      function updateRowCount(count) {
        cardCount.textContent = count;
      }

      // Function to filter rows based on search query and category
      function filterRowsBySearchQueryAndCategory(query, selectedCategory) {
        const rows = tableBody.querySelectorAll("tr");

        let visibleRowCount = 0;

        rows.forEach((row) => {
          const rowData = row.textContent.toLowerCase();
          const isCategoryMatch = selectedCategory === "All Distribution" || rowData.includes(selectedCategory.toLowerCase());
          const isDetailsMatch = rowData.includes(query);

          const isVisible = isCategoryMatch && isDetailsMatch;

          row.style.display = isVisible ? "table-row" : "none";

          if (isVisible) {
            visibleRowCount++;
          }
        });

        updateRowCount(visibleRowCount);
      }

      function setActiveLink(link) {
        // Remove "active" class from all links
        const links = document.querySelectorAll('#navLinks a');
        links.forEach((item) => {
          item.classList.remove('active');
        });
    
        // Add "active" class to the clicked link
        link.classList.add('active');
      }

      // Event listener for search box input
      searchBox.addEventListener("input", function () {
        const query = searchBox.value.toLowerCase();
        const selectedCategory = categoryDropdown.value;
        filterRowsBySearchQueryAndCategory(query, selectedCategory);
      });

      // Event listener for dropdown change
      categoryDropdown.addEventListener("change", function () {
        const query = searchBox.value.toLowerCase();
        const selectedCategory = categoryDropdown.value;
        filterRowsBySearchQueryAndCategory(query, selectedCategory);
      });

      // Loop through the JSON data and create table rows
      data.forEach(createTableRow);

      // Initially, update row count based on the total rows
      updateRowCount(data.length);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// Function to copy text to clipboard and temporarily change the cell text
function copyToClipboardAndShowNotification(cell, text) {
  navigator.clipboard.writeText(text);

  // Temporarily change the text content to "Email Copied!" for 1 second
  const originalText = cell.textContent;
  cell.textContent = "Email Copied!";

  setTimeout(() => {
    cell.textContent = originalText;
  }, 1000);
}
