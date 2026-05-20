const textArea = this.querySelector("#comment-input");

textArea.addEventListener("input", () => {
  dispatch("update-comment", { comment: textArea.value });
});
