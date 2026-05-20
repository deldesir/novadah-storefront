let qty = 1;

// TODO: add qty checks

listen("increase-cart-qty", () => {
  qty++;
  dispatch("updated-qty", { qty });
});

listen("decrease-cart-qty", () => {
  qty = Math.max(qty - 1, 1);
  dispatch("updated-qty", { qty });
});

listen("add-to-cart", async () => {
  try {
    if (!qty) {
      dispatch("show-error", {
        type: "warning",
        message: "Can not add 0 items!",
      });
      return;
    }
    const { item_code } = block_data;
    await frappe_call(
      "POST",
      "webshop.webshop.shopping_cart.cart.update_cart",
      { item_code, qty }
    );
    dispatch("show-toast", {
      message: "Item added to cart!",
      type: "success",
    });
  } catch (e) {
    console.error(e);
    dispatch("show-toast", {
      message: "Could not add item to cart!",
      type: "error",
    });
    const errors = (JSON.parse(e.message)).errors
    if (errors[0].type == "PermissionError") {
      window.location.href = "/login";
      return;
    }
  }
});
