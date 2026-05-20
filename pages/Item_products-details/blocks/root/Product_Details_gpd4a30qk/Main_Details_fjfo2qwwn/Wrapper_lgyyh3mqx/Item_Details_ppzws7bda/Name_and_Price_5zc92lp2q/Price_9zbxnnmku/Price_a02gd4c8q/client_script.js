if (typeof props["formatted_price"] == "string" && props["formatted_price"]) {
  this.innerText = props["formatted_price"]
} else {
  this.innerText = ""
}