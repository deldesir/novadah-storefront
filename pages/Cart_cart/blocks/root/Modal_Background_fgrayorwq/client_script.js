listen("open-address-modal", (e) => {
  this.style.top = "0px";
  this.style.left = "0px";
  console.log(e)
  if (e.detail.addressType == "shipping") {
    this.querySelector(".shipping-address-selector").style.display = "flex";
    this.querySelector(".billing-address-selector").style.display = "none";
  } else {
    this.querySelector(".shipping-address-selector").style.display = "none";
    this.querySelector(".billing-address-selector").style.display = "flex";
  }
});

listen("close-address-modal", (e) => {
  this.style.top = "-200%";
  this.style.left = "0px";
});
