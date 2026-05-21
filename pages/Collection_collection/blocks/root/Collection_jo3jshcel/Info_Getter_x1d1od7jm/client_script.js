if (block_data.redirect && !this.dataset.blockId) {
  window.location.href = "/shop"
}

if (block_data.title) {
  document.title = `Collection - ${block_data.title}`;
}