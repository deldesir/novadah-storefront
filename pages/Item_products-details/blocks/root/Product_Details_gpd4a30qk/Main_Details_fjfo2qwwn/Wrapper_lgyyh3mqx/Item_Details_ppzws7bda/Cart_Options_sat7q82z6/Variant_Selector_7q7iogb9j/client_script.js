const initially_attribute_values = JSON.parse(
  props["initally_selected_attribute"]
);

let selected_top_attribute = {};
let selected_attributes = {};

for (const attribute of initially_attribute_values) {
  const event = new CustomEvent("selected-attribute", { detail: attribute });
  this.dispatchEvent(event);
  selected_attributes[attribute["attribute"]] = attribute["attribute_value"];
}

this.addEventListener("select-attribute", (ev) => {
  if (ev.detail.is_top_attribute) {
    selected_top_attribute[ev.detail.attribute] = ev.detail.value;
    selected_attributes = {};
    selected_attributes[ev.detail.attribute] = ev.detail.value;
    if (!ev.detail.suppress_reset) {
      const event = new CustomEvent("reset-options");
      this.dispatchEvent(event);
    }
  } else {
    selected_attributes[ev.detail.attribute] = ev.detail.value;
  }
  frappe_call(
    "POST",
    "webshop.webshop.variant_selector.utils.get_next_attribute_and_values",
    {
      item_code: props["variant_template_item_code"],
      selected_attributes,
    }
  )
    .then(async (res) => {
      res = res.data;
      for (const attribute in res.valid_options_for_attributes) {
        const allowedOptionEvent = new CustomEvent("allowed-option", {
          detail: {
            attribute,
            values: res.valid_options_for_attributes[attribute],
          },
        });
        this.dispatchEvent(allowedOptionEvent);
        const selectedAttributeEvent = new CustomEvent("selected-attribute", {
          detail: {
            attribute: ev.detail.attribute,
            attribute_value: ev.detail.value,
          },
        });
        this.dispatchEvent(selectedAttributeEvent);
        if (res.exact_match_web_item_code) {
          window.location.href = res.exact_match_web_item_code;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
