const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()  
  users.forEach(user => {
    const isVisible =  user.Details.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("db2.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]

      // const ID = card.querySelector("[data-id]")
      const Category = card.querySelector("[data-category]")
      const Details = card.querySelector("[data-details]")
      const Email1 = card.querySelector("[data-emailTo]")
      const HideTo = card.querySelector("[data-emailToHide]")
      const Email2 = card.querySelector("[data-emailCc]")
      // const HideCC = card.querySelector("[data-emailCcHide]")
      
      // ID.textContent = user.ID
      Category.textContent = user.Category
      Details.textContent = user.Detail
      Email1.textContent = user.TitleTO
      HideTo.textContent = user.EmailTO
      Email2.textContent = user.TitleCC
      // HideCC.textContent = user.TitleCC
     
      userCardContainer.append(card)
      return {Category: user.Category, Details:user.Detail, Email1:user.TitleTO, Email2:user.TitleCC, element: card}
    })
  })

  


document.addEventListener("DOMContentLoaded", function () {
  const copyTd = document.querySelector(".copy-text");

  copyTd.addEventListener("click", function () {
    
    const textToCopy = this.textContent;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.setAttribute("value", textToCopy);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Copied to clipboard: " + textToCopy);
  });
});
