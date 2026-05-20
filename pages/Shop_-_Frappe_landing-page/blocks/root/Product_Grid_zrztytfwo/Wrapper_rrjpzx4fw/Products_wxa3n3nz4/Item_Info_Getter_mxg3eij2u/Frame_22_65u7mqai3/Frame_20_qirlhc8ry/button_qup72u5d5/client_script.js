if (!props["is_template"]) {
  this.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const item_code = props["item_code"];
      this.style.cursor = "progress";
      await frappe_call(
        "POST",
        "webshop.webshop.shopping_cart.cart.update_cart",
        { item_code, qty: 1 }
      );
      // window.location.reload();
      dispatch("show-toast", {
        message: `${props["item_name"]} added to cart!`,
        type: "success",
      });
    } catch (e) {
      dispatch("show-toast", {
        message: "Could not edit quantity",
        type: "error",
      });
      const errors = JSON.parse(e.message).errors;
      if (errors[0].type == "PermissionError") {
        window.location.href = "/login";
        return;
      }
    } finally {
      this.style.cursor = "pointer";
    }
  });
}
