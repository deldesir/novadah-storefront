const couponCodeInput = document.querySelector("#coupon-code-input");

this.addEventListener("click", async () => {
  if (couponCodeInput) {
    const couponCode = couponCodeInput.value;
    if (couponCode) {
      try {
        await frappe_call(
          "POST",
          "webshop.webshop.shopping_cart.cart.apply_coupon_code",
          { applied_code: couponCode }
        );
        window.location.reload();
      } catch (error) {
        dispatch("show-toast", {
          type: "error",
          message:
            "Could not apply coupon code! Please check if correct code is provided.",
        });
      }
    } else {
      dispatch("show-toast", {
          type: "warning",
          message:
            "No coupon code provided!",
        });
    }
  }
});
