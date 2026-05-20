listen("frappe-call-open", () => {
  this.style.top = 0;
  this.style.left = 0;
});

listen("frappe-call-error", () => {
  this.style.top = "-100%";
  this.style.left = "-100%";
});
