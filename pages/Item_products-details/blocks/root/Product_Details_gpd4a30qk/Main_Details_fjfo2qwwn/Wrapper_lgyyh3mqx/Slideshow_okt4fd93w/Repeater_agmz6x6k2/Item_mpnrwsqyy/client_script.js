const slideshow_wrapper = this.closest("[data-slideshow]")
const change_image_event = new CustomEvent("change_image_event", {detail: props["image_url"]})
this.addEventListener("click",() => {
  slideshow_wrapper.dispatchEvent(change_image_event);
})