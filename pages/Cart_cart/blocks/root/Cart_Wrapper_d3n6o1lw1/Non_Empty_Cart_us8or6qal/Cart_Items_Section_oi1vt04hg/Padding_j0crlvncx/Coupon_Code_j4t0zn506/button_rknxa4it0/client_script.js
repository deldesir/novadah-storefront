let isCouponCodeFormOpen = false;

this.addEventListener("click", () => {
  let action;
  if (isCouponCodeFormOpen) {
    action = "close";
  } else {
    action = "open";
  }
  dispatch(`${action}-coupon-code-form`);
  isCouponCodeFormOpen = !isCouponCodeFormOpen;
});
