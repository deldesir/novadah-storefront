this.addEventListener("click", async () => {
  await frappe_call(
    "POST",
    "webshop.webshop.shopping_cart.cart.remove_coupon_code",
    {}
  );
  window.location.reload();
});
