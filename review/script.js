const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value)  || user.dept.toLowerCase().includes(value)  || user.ext.toLowerCase().includes(value) || user.designation.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("db2.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const photo = card.querySelector("[data-photo]")
      const header = card.querySelector("[data-header]")
      const designation = card.querySelector("[data-designation]")
      const dept = card.querySelector("[data-dept]")
      const ext = card.querySelector("[data-ext]")
      const body = card.querySelector("[data-body]") 
      photo.textContent = user.photo
      header.textContent = user.name
      designation.textContent = user.designation
      dept.textContent = user.dept
      ext.textContent = user.ext
      body.textContent = user.email
      userCardContainer.append(card)
      return { photo: user.photo, name: user.name, designation:user.designation, dept: user.dept, ext:user.ext, email: user.email, element: card}
    })
  })


  //Drop Down button
let select = document.getElementById("select");
let list = document.getElementById("list");
let selectText = document.getElementById("selectText");
let options = document.getElementById("options");
let inputField = document.getElementById("inputField");


select.onclick=function(){
  list.classList.toggle("open");
}

for(option of options){
  option.onclick = function(){
    selectText.innerHTML = this.innerHTML;
    inputField.placeholder = selectText.innerHTML;
  }
}