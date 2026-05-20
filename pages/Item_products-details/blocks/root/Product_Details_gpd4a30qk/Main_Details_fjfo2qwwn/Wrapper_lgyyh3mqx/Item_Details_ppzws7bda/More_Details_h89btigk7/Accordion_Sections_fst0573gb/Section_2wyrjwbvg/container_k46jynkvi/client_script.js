const wrapper = this.closest("[data-wrapper]");

this.style.maxHeight = "0px";
if (wrapper) {
  wrapper.addEventListener("state_change", (ev) => {
    if (ev.detail) {
      this.style.maxHeight = "240px";
    } else {
      this.style.maxHeight = "0px";
    }
  });
}
