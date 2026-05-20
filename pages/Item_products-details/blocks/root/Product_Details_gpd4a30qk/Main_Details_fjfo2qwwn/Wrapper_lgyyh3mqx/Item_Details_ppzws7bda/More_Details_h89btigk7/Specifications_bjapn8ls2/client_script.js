this.querySelectorAll("style").forEach((node) => node.remove())
const style_tag = document.createElement("style")
style_tag.textContent = 
`
[data-items] .spec-row:nth-child(even) {
  background-color: #F4F4F4;
}
`

this.appendChild(style_tag)