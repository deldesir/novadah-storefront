const available_collections = JSON.parse(props["available_collections"])
const selected_collections = props["selected_collections"].split(",")
console.log(selected_collections, props["selected_collections"])
this.closest("[data-select-wrapper]").addEventListener(
  "multiselect-available",
  () => {
    let loadUI = window.loadMultiSelectUI;
    const data = available_collections.map((item) => ({"text": item.name, "value": item.name, "selected": selected_collections.includes(item.name)}));
    loadUI(this, data, "Collections");
  }
);


