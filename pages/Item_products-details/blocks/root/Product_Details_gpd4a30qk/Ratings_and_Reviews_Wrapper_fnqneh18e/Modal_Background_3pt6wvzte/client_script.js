listen("open-review-modal", () => {
  this.style.top = "0px";
  this.style.left = "0px";
});

listen("close-review-modal", () => {
  this.style.top = "-100%";
  this.style.left = "-100%";
});
