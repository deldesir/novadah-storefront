/*
 * Created by David Adams
 * https:///codeshack.io/multi-select-dropdown-html-javascript/
 *
 * Released under the MIT license
 */

const styles = `
[data-select-wrapper] > div {
  flex-grow: 1;
}
.multi-select {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  width: 100%;
  user-select: none;
}
.multi-select .multi-select-header {
  border: 1px solid #dee2e6;
  padding: 7px 30px 7px 12px;
  overflow: hidden;
  gap: 7px;
  min-height: 45px;
}
.multi-select .multi-select-header::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  background-image: url("https:///ucarecdn.com/279e3230-335f-4fda-8889-7048837a483c/");
  height: 12px;
  width: 12px;
}
.multi-select .multi-select-header.multi-select-header-active {
  border-color: #cdcdcd;
}
.multi-select .multi-select-header.multi-select-header-active::after {
  transform: translateY(-50%) rotate(180deg);
}
.multi-select
  .multi-select-header.multi-select-header-active
  + .multi-select-options {
  display: flex;
}
.multi-select .multi-select-header .multi-select-header-placeholder {
  color: #65727e;
}
.multi-select .multi-select-header .multi-select-header-option {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f7;
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 5px;
}
.multi-select .multi-select-header .multi-select-header-max {
  font-size: 14px;
  color: #65727e;
}
.multi-select .multi-select-options {
  display: none;
  box-sizing: border-box;
  flex-flow: wrap;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
  margin-top: 5px;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  width: fit-content;
  max-width: 50vw;
  border: 1px solid #cdcdcd;
}
.multi-select .multi-select-options::-webkit-scrollbar {
  width: 3px;
}
.multi-select .multi-select-options::-webkit-scrollbar-track {
  background: #f0f1f3;
}
.multi-select .multi-select-options::-webkit-scrollbar-thumb {
  background: #cdcfd1;
}
.multi-select .multi-select-options::-webkit-scrollbar-thumb:hover {
  background: #b2b6b9;
}
.multi-select .multi-select-options .multi-select-option,
.multi-select .multi-select-options .multi-select-all {
  padding: 4px 12px;
  height: 42px;
}
.multi-select
  .multi-select-options
  .multi-select-option
  .multi-select-option-radio,
.multi-select
  .multi-select-options
  .multi-select-all
  .multi-select-option-radio {
  margin-right: 14px;
  height: 14px;
  width: 14px;
  border: 1px solid #ced4da;
}
.multi-select
  .multi-select-options
  .multi-select-option
  .multi-select-option-text,
.multi-select
  .multi-select-options
  .multi-select-all
  .multi-select-option-text {
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: inherit;
  font-size: 16px;
  line-height: 20px;
}
.multi-select
  .multi-select-options
  .multi-select-option.multi-select-selected
  .multi-select-option-radio,
.multi-select
  .multi-select-options
  .multi-select-all.multi-select-selected
  .multi-select-option-radio {
  border-color: #000;
  background-color: #000;
}
.multi-select
  .multi-select-options
  .multi-select-option.multi-select-selected
  .multi-select-option-radio::after,
.multi-select
  .multi-select-options
  .multi-select-all.multi-select-selected
  .multi-select-option-radio::after {
  content: "";
  display: block;
  width: 4px;
  height: 9px;
  margin: 0 33%;
  border: solid #fff;
  border-width: 0 0.1em 0.1em 0;
  transform: rotate(45deg);
}
.multi-select
  .multi-select-options
  .multi-select-option.multi-select-selected
  .multi-select-option-text,
.multi-select
  .multi-select-options
  .multi-select-all.multi-select-selected
  .multi-select-option-text {
  color: #000;
}
.multi-select .multi-select-options .multi-select-option:hover,
.multi-select .multi-select-options .multi-select-option:active,
.multi-select .multi-select-options .multi-select-all:hover,
.multi-select .multi-select-options .multi-select-all:active {
  background-color: #f3f4f7;
}
.multi-select .multi-select-options .multi-select-all {
  border-bottom: 1px solid #f1f3f5;
  border-radius: 0;
}
.multi-select .multi-select-options .multi-select-search {
  padding: 7px 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin: 10px 10px 5px 10px;
  width: 100%;
  outline: none;
  font-size: 16px;
}
.multi-select .multi-select-options .multi-select-search::placeholder {
  color: #b2b5b9;
}
.multi-select .multi-select-header,
.multi-select .multi-select-option,
.multi-select .multi-select-all {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  color: #212529;
}
.multi-select-all {
  width: 100% !important;
}
`;
const styleTag = document.createElement("style");
styleTag.innerText = styles;
this.appendChild(styleTag);

class MultiSelect {
  constructor(element, options = {}) {
    let defaults = {
      placeholder: "Select item(s)",
      max: null,
      search: true,
      selectAll: true,
      listAll: true,
      closeListOnItemSelect: false,
      name: "",
      width: "",
      height: "",
      dropdownWidth: "",
      dropdownHeight: "",
      data: [],
      onChange: function () {},
      onSelect: function () {},
      onUnselect: function () {},
    };
    this.options = Object.assign(defaults, options);
    this.selectElement =
      typeof element === "string" ? document.querySelector(element) : element;

    const booleanOptions = [
      "search",
      "selectAll",
      "listAll",
      "closeListOnItemSelect",
    ];
    for (const prop in this.selectElement.dataset) {
      if (this.options.hasOwnProperty(prop)) {
        let value = this.selectElement.dataset[prop];
        if (booleanOptions.includes(prop)) {
          this.options[prop] = value === "true";
        } else if (prop === "max" && value !== null && value !== "") {
          this.options[prop] = parseInt(value, 10);
        } else if (value !== null && value !== "") {
          this.options[prop] = value;
        }
      }
    }
    this.name = this.selectElement.getAttribute("name")
      ? this.selectElement.getAttribute("name")
      : "multi-select-" + Math.floor(Math.random() * 1000000);
    if (!this.options.data.length) {
      let options = this.selectElement.querySelectorAll("option");
      for (let i = 0; i < options.length; i++) {
        this.options.data.push({
          value: options[i].value,
          text: options[i].innerHTML,
          selected: options[i].selected,
          html: options[i].getAttribute("data-html"),
        });
      }
    }
    this.element = this._template();
    this.selectElement.replaceWith(this.element);
    this._updateSelected();
    this._eventHandlers();
    this._updateSelectAllButtonState(); // Initial state update
  }

  _template() {
    let optionsHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      optionsHTML += `
                <div class="multi-select-option${
                  this.selectedValues.includes(this.data[i].value)
                    ? " multi-select-selected"
                    : ""
                }" data-value="${this.data[i].value}">
                    <span class="multi-select-option-radio"></span>
                    <span class="multi-select-option-text">${
                      this.data[i].html ? this.data[i].html : this.data[i].text
                    }</span>
                </div>
            `;
    }
    let selectAllHTML = "";
    // Simplified boolean check
    if (this.options.selectAll) {
      selectAllHTML = `<div class="multi-select-all">
                <span class="multi-select-option-radio"></span>
                <span class="multi-select-option-text">Select all</span>
            </div>`;
    }
    let template = `
            <div class="multi-select ${this.name}"${
      this.selectElement.id ? ' id="' + this.selectElement.id + '"' : ""
    } style="${this.width ? "width:" + this.width + ";" : ""}${
      this.height ? "height:" + this.height + ";" : ""
    }">
                ${this.selectedValues
                  .map(
                    (value) =>
                      `<input type="hidden" name="${this.name}[]" value="${value}">`
                  )
                  .join("")}
                <div class="multi-select-header" style="${
                  this.width ? "width:" + this.width + ";" : ""
                }${this.height ? "height:" + this.height + ";" : ""}">
                    <span class="multi-select-header-max">${
                      this.options.max
                        ? this.selectedValues.length + "/" + this.options.max
                        : ""
                    }</span>
                    <span class="multi-select-header-placeholder">${
                      this.placeholder
                    }</span>
                </div>
                <div class="multi-select-options" style="${
                  this.options.dropdownWidth
                    ? "width:" + this.options.dropdownWidth + ";"
                    : ""
                }${
      this.options.dropdownHeight
        ? "height:" + this.options.dropdownHeight + ";"
        : ""
    }">
                    ${
                      this.options.search === true ||
                      this.options.search === "true"
                        ? '<input type="text" class="multi-select-search" placeholder="Search...">'
                        : ""
                    }
                    ${selectAllHTML}
                    ${optionsHTML}
                </div>
            </div>
        `;
    let element = document.createElement("div");
    element.innerHTML = template;
    element.style.minWidth = this.width;
    return element;
  }

  _eventHandlers() {
    let headerElement = this.element.querySelector(".multi-select-header");
    this.element.querySelectorAll(".multi-select-option").forEach((option) => {
      option.onclick = () => {
        let selected = true;
        if (!option.classList.contains("multi-select-selected")) {
          if (
            this.options.max &&
            this.selectedValues.length >= this.options.max
          ) {
            return;
          }
          option.classList.add("multi-select-selected");
          this.element
            .querySelector(".multi-select")
            .insertAdjacentHTML(
              "afterbegin",
              `<input type="hidden" name="${this.name}[]" value="${option.dataset.value}">`
            );
          this.data.filter(
            (data) => data.value == option.dataset.value
          )[0].selected = true;
        } else {
          option.classList.remove("multi-select-selected");
          this.element
            .querySelector(`input[value="${option.dataset.value}"]`)
            .remove();
          this.data.filter(
            (data) => data.value == option.dataset.value
          )[0].selected = false;
          selected = false;
        }
        if (!this.options.listAll) {
          if (this.element.querySelector(".multi-select-header-option")) {
            this.element.querySelector(".multi-select-header-option").remove();
          }
          headerElement.insertAdjacentHTML(
            "afterbegin",
            `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`
          );
        }
        if (this.options.max) {
          this.element.querySelector(".multi-select-header-max").innerHTML =
            this.selectedValues.length + "/" + this.options.max;
        }
        if (this.options.search) {
          this.element.querySelector(".multi-select-search").value = "";
        }
        this.element
          .querySelectorAll(".multi-select-option")
          .forEach((option) => (option.style.display = "flex"));
        if (this.options.closeListOnItemSelect) {
          headerElement.classList.remove("multi-select-header-active");
        }
        this.options.onChange(
          option.dataset.value,
          option.querySelector(".multi-select-option-text").innerHTML,
          option
        );
        if (selected) {
          this.options.onSelect(
            option.dataset.value,
            option.querySelector(".multi-select-option-text").innerHTML,
            option
          );
        } else {
          this.options.onUnselect(
            option.dataset.value,
            option.querySelector(".multi-select-option-text").innerHTML,
            option
          );
        }
        this._updateSelectAllButtonState(); // Update after individual click
      };
    });
    headerElement.onclick = () =>
      headerElement.classList.toggle("multi-select-header-active");

    if (this.options.search) {
      let search = this.element.querySelector(".multi-select-search");
      search.oninput = () => {
        this.element
          .querySelectorAll(".multi-select-option")
          .forEach((option) => {
            option.style.display =
              option
                .querySelector(".multi-select-option-text")
                .innerHTML.toLowerCase()
                .indexOf(search.value.toLowerCase()) > -1
                ? "flex"
                : "none";
          });
        this._updateSelectAllButtonState(); // Update after search filters items
      };
    }

    if (this.options.selectAll) {
      let selectAllButton = this.element.querySelector(".multi-select-all");
      selectAllButton.onclick = () => {
        let isCurrentlySelectAllActive = selectAllButton.classList.contains(
          "multi-select-selected"
        );
        let changedItems = [];
        let currentSelectedCount = this.selectedValues.length;

        this.element
          .querySelectorAll(".multi-select-option")
          .forEach((option) => {
            // Only consider visible options for select/deselect all
            if (option.style.display === "none") return;

            let dataItem = this.data.find(
              (data) => data.value == option.dataset.value
            );
            if (!dataItem) return;

            const shouldBeSelected = !isCurrentlySelectAllActive;

            if (dataItem.selected !== shouldBeSelected) {
              if (shouldBeSelected) {
                // Try to select
                if (
                  !this.options.max ||
                  currentSelectedCount < this.options.max
                ) {
                  option.classList.add("multi-select-selected");
                  this.element
                    .querySelector(".multi-select")
                    .insertAdjacentHTML(
                      "afterbegin",
                      `<input type="hidden" name="${this.name}[]" value="${option.dataset.value}">`
                    );
                  dataItem.selected = true;
                  currentSelectedCount++;
                  changedItems.push({
                    value: option.dataset.value,
                    text: option.querySelector(".multi-select-option-text")
                      .innerHTML,
                    option: option,
                    selected: true,
                  });
                }
              } else {
                // Try to unselect
                option.classList.remove("multi-select-selected");
                this.element
                  .querySelector(`input[value="${option.dataset.value}"]`)
                  ?.remove();
                dataItem.selected = false;
                currentSelectedCount--;
                changedItems.push({
                  value: option.dataset.value,
                  text: option.querySelector(".multi-select-option-text")
                    .innerHTML,
                  option: option,
                  selected: false,
                });
              }
            }
          });

        this._processBatchChanges(changedItems);
        this._updateSelectAllButtonState(); // Update button state based on actual selections
      };
    }
    if (
      this.selectElement.id &&
      document.querySelector('label[for="' + this.selectElement.id + '"]')
    ) {
      document.querySelector(
        'label[for="' + this.selectElement.id + '"]'
      ).onclick = () => {
        headerElement.classList.toggle("multi-select-header-active");
      };
    }
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest("." + this.name) &&
        !event.target.closest('label[for="' + this.selectElement.id + '"]')
      ) {
        headerElement.classList.remove("multi-select-header-active");
      }
    });
  }

  _processBatchChanges(changedItems) {
    if (changedItems.length === 0) return;

    // Update header
    if (!this.options.listAll) {
      const headerOption = this.element.querySelector(
        ".multi-select-header-option"
      );
      if (headerOption) headerOption.remove();
      this.element
        .querySelector(".multi-select-header")
        .insertAdjacentHTML(
          "afterbegin",
          `<span class="multi-select-header-option">${this.selectedValues.length} selected</span>`
        );
    }

    // Update max count if needed
    if (this.options.max) {
      this.element.querySelector(".multi-select-header-max").innerHTML =
        this.selectedValues.length + "/" + this.options.max;
    }

    // Trigger single onChange for all items
    this.options.onChange(
      changedItems.map((item) => item.value),
      changedItems.map((item) => item.text),
      changedItems.map((item) => item.option)
    );

    // Trigger onSelect/onUnselect for items
    changedItems.forEach((item) => {
      if (item.selected) {
        this.options.onSelect(item.value, item.text, item.option);
      } else {
        this.options.onUnselect(item.value, item.text, item.option);
      }
    });
  }

  _updateSelected() {
    if (
      this.element.querySelector(".multi-select-header-option") &&
      this.element.querySelector(".multi-select-header-placeholder")
    ) {
      this.element.querySelector(".multi-select-header-placeholder").remove();
    }
    // Call _updateSelectAllButtonState here if not called at the end of constructor
    // this._updateSelectAllButtonState();
  }

  _updateSelectAllButtonState() {
    if (!this.options.selectAll) return;
    const selectAllButton = this.element.querySelector(".multi-select-all");
    if (!selectAllButton) return;

    const visibleOptions = Array.from(
      this.element.querySelectorAll(".multi-select-option")
    ).filter((opt) => opt.style.display !== "none");

    if (visibleOptions.length === 0) {
      selectAllButton.classList.remove("multi-select-selected");
      return;
    }

    const selectedVisibleOptionsCount = visibleOptions.filter((opt) =>
      opt.classList.contains("multi-select-selected")
    ).length;

    if (selectedVisibleOptionsCount === visibleOptions.length) {
      // All visible items are selected
      selectAllButton.classList.add("multi-select-selected");
    } else {
      // Not all visible items are selected
      selectAllButton.classList.remove("multi-select-selected");
    }
  }

  get selectedValues() {
    return this.data.filter((data) => data.selected).map((data) => data.value);
  }

  get selectedItems() {
    return this.data.filter((data) => data.selected);
  }

  set data(value) {
    this.options.data = value;
  }

  get data() {
    return this.options.data;
  }

  set selectElement(value) {
    this.options.selectElement = value;
  }

  get selectElement() {
    return this.options.selectElement;
  }

  set element(value) {
    this.options.element = value;
  }

  get element() {
    return this.options.element;
  }

  set placeholder(value) {
    this.options.placeholder = value;
  }

  get placeholder() {
    return this.options.placeholder;
  }

  set name(value) {
    this.options.name = value;
  }

  get name() {
    return this.options.name;
  }

  set width(value) {
    this.options.width = value;
  }

  get width() {
    return this.options.width;
  }

  set height(value) {
    this.options.height = value;
  }

  get height() {
    return this.options.height;
  }
}

const loadMultiSelectUI = (element, data, placeholder) => {
  let obj = new MultiSelect(element, {
    data,
    name: placeholder,
    placeholder,
    onChange: (value, text, option) => {
      items = obj.selectedItems.map((item) => item.value);
      key = placeholder;
      console.log(key, items);
      const params = new URLSearchParams(window.location.search);
      const url = new URL(window.location.href);

      // Set or replace the target key
      if (items.length) params.set(key, items.join(","));
      else params.delete(key);
      console.log(params);
      // Reload page with updated params
      window.location.search = params.toString();
    },
  });
};

window.loadMultiSelectUI = loadMultiSelectUI;

setTimeout(() => {
  this.dispatchEvent(new CustomEvent("multiselect-available"));
}, 100);
