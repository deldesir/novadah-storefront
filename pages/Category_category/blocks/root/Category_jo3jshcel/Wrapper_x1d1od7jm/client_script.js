if (block_data.redirect && !this.dataset.blockId) {
  window.location.href = "/shop";
}

if (block_data.title) {
  document.title = `Category - ${block_data.title}`;
}
