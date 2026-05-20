const variant_wrapper = this.closest("[data-variant-selector]");
let is_selected = false;
const toggle_disabled = (disabled) => {
  if (disabled) {
    this.disabled = true;
    this.style.cursor = "not-allowed";
    this.style.background = "rgb(240,240,240)";
    this.querySelector("div").style.color = "rgb(128,128,128)";
  } else {
    this.disabled = false;
    this.style.cursor = "pointer";
    this.style.background = "white";
    this.querySelector("div").style.color = "rgb(56,56,56)";
  }
};

variant_wrapper.addEventListener("selected-attribute", (ev) => {
  if (ev.detail.attribute == props["attribute"]) {
    if (ev.detail.attribute_value == props["value"]) {
      is_selected = true;
      this.style.background = "rgb(56, 56, 56)";
      if (this.querySelector(".value-name")) {
        this.querySelector(".value-name").style.color = "white";
      }
      if (!props["variant_index"]) {
        document.addEventListener("DOMContentLoaded", () => {
          const event = new CustomEvent("select-attribute", {
            detail: {
              attribute: props["attribute"],
              value: props["value"],
              is_top_attribute: true,
              suppress_reset: true,
            },
          });
          variant_wrapper.dispatchEvent(event);
        });
      }
    } else {
      this.style.background = "white";
      if (this.querySelector(".value-name")) {
        this.querySelector(".value-name").style.color = "rgb(56, 56, 56)";
      }
    }
  }
});

variant_wrapper.addEventListener("allowed-option", (ev) => {
  if (is_selected || props["variant_index"] == 0) return;
  if (ev.detail.attribute == props["attribute"]) {
    if (ev.detail.values.includes(props["value"])) toggle_disabled(false);
    else toggle_disabled(true);
  }
});

variant_wrapper.addEventListener("reset-options", (ev) => {
  if (props["variant_index"] == 0) return;
  this.disabled = false;
  this.style.cursor = "pointer";
  this.style.background = "white";
  this.querySelector("div").style.color = "rgb(56,56,56)";
});

this.addEventListener("click", () => {
  let event = new CustomEvent("select-attribute", {
    detail: {
      attribute: props["attribute"],
      value: props["value"],
      is_top_attribute: !props["variant_index"],
    },
  });
  variant_wrapper.dispatchEvent(event);
  event = new CustomEvent("selected-attribute", {
    detail: {
      attribute: props["attribute"],
      value: props["value"],
    },
  });
  variant_wrapper.dispatchEvent(event);
});
