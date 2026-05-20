this.addEventListener("click", () => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", parseInt(props["page"]) + 1);

  window.location.href = url.toString();
});
