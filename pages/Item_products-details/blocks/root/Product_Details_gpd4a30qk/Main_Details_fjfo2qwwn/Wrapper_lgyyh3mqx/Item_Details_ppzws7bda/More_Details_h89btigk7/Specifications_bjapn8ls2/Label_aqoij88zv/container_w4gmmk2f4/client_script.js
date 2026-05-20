const lucidePromise = import("https://esm.sh/lucide");

const renderIcon = async () => {
  // remove previous svgs
  this.querySelectorAll("svg").forEach(elem => elem.remove());
  
  const icon = document.createElement("i");
  icon.dataset.lucide = props.icon_name;
  this.appendChild(icon);

  const lucide = await lucidePromise;
  const { createIcons } = lucide;

  // convert kebab-case → PascalCase
  const iconName = props.icon_name
    .split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join("");

  const Icon = lucide[iconName];

  createIcons({
    icons: {
      [iconName]: Icon
    }
  });
};


renderIcon();

const wrapper = this.closest("[data-wrapper]")
if (wrapper) {
  wrapper.addEventListener("state_change", (ev) => {
    if (ev.detail) {
      this.style.transform = "rotate(180deg)";
    } else {
      this.style.transform = "rotate(0deg)";
    }
  });
}