let is_open = false;

function new_custom_event() {
  const custom_event = new CustomEvent("state_change", { detail: !is_open });
  return custom_event;
}

this.addEventListener("click", () => {
  this.closest("[data-wrapper]").dispatchEvent(new_custom_event());
  is_open = !is_open;
});