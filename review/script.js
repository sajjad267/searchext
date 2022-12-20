const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || user.dept.toLowerCase().includes(value) || user.ext.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("db2.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const dept = card.querySelector("[data-dept]")
      const ext = card.querySelector("[data-ext]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      dept.textContent = user.dept
      ext.textContent = user.ext
      body.textContent = user.email
      userCardContainer.append(card)
      return { name: user.name, dept: user.dept, ext:user.ext, email: user.email, element: card }
    })
  })