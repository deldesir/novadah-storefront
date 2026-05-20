this.style.display = "none";

listen("open-coupon-code-form", () => {
  this.style.display = "flex";
});

listen("close-coupon-code-form", () => {
  this.style.display = "none";
});
