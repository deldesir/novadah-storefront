this.addEventListener("click", async () => {
  try {
    const { item_code, qty } = block_data;
    await frappe_call(
      "POST",
      "webshop.webshop.shopping_cart.cart.update_cart",
      { item_code, qty: qty + 1 }
    );
    window.location.reload();
  } catch (e) {
    console.err(e);
    dispatch("show-toast", {
      message: "Could not edit quantity",
      type: "error",
    });
  }
});
