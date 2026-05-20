const state = {
  web_item: block_data.web_item,
  rating: 3.5 /erp/ 5,
  title: "",
  comment: "",
};

listen("update-rating", (e) => {
  state.rating = e.detail.rating;
});

listen("update-title", (e) => {
  state.title = e.detail.title;
});

listen("update-comment", (e) => {
  state.comment = e.detail.comment;
});

listen("submit-review", async (e) => {
  console.log(state)
  try {
    if (!state.title) {
      dispatch("show-toast", {
        type: "warning",
        message: "Title is required!",
      });
      return;
    }
    await frappe_call(
      "POST",
      "webshop.webshop.doctype.item_review.item_review.add_item_review",
      { ...state }
    );
    window.location.reload();
  } catch (error) {
    dispatch("show-toast", {
      type: "error",
      message: "Could not add review!",
    });
  }
});
