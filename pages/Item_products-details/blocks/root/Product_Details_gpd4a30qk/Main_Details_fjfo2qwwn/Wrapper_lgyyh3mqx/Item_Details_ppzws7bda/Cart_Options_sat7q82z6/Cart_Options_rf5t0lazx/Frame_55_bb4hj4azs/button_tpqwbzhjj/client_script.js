const toRoute = (obj) => {
  const [key, value] = Object.entries(obj)[0];
  return `/${key}s/${value}`;
};

this.addEventListener("click", async () => {
  try {
    this.style.cursor = "progress";
    const req_body = { item_code: block_data.item_code };
    const res = await frappe_call(
      "POST",
      "webshop.webshop.shopping_cart.cart.buy_now",
      req_body
    );
    const route = toRoute(res.data);
    window.location.href = route;
  } catch (e) {
    console.error(e);
    dispatch("show-toast", {
      message: `${block_data.item_code} could not be added to cart!`,
      type: "error",
      duration: 3000,
    });
    const errors = (JSON.parse(e.message)).errors
    if (errors[0].type == "PermissionError") {
      window.location.href = "/login";
      return;
    }
  } finally {
    this.style.cursor = "pointer";
  }
});
