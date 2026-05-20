function goToNextReviewPage() {
  const url = new URL(window.location.href);

  let currentPage = parseInt(url.searchParams.get("review_page")) || 1;

  url.searchParams.set("review_page", currentPage + 1);

  window.location.href = url.toString();
}

this.addEventListener("click", () => {
  goToNextReviewPage();
});
