const slideshow_wrapper = this.closest("[data-slideshow]")

slideshow_wrapper.addEventListener("change_image_event",(ev) => {
  this.src = ev.detail;
})