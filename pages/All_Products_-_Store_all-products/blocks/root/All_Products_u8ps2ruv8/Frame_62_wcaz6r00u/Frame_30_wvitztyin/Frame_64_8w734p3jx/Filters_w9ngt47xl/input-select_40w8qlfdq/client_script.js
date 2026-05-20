const available_categories = JSON.parse(props["available_categories"])
const selected_categories = props["selected_categories"].split(",")
console.log(selected_categories, props["selected_categories"])
this.closest("[data-select-wrapper]").addEventListener(
  "multiselect-available",
  () => {
    let loadUI = window.loadMultiSelectUI;
    const data = available_categories.map((item) => ({"text": item.name, "value": item.name, "selected": selected_categories.includes(item.name)}));
    loadUI(this, data, "Categories");
  }
);


