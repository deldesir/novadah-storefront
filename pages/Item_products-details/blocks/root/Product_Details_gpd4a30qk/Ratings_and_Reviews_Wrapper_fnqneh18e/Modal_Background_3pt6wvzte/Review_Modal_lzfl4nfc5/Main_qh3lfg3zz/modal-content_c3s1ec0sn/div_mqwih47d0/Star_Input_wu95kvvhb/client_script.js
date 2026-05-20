function createStarRatingInput({
  container,
  count = 5,
  defaultValue = 0,
  filledColor = "var(--color-text-primary)",
  emptyColor = "var(--color-border-secondary)",
  onChange = null,
} = {}) {
  // ── Styles ────────────────────────────────────────────────────────────────
  const STYLE_ID = "star-rating-styles";
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      .star-rating-heading{font-size:13px;color:var(--color-text-secondary);margin:0 0 12px;letter-spacing:.02em;text-transform:uppercase;font-weight:500}
      .star-rating-stars{display:inline-flex;gap:4px;cursor:pointer;padding:4px 0;position:relative}
      .star-rating-slot{width:40px;height:40px;position:relative;flex-shrink:0}
      .star-rating-slot .half-hit{position:absolute;top:0;left:0;width:50%;height:100%;z-index:2}
      .star-rating-slot .full-hit{position:absolute;top:0;left:50%;width:50%;height:100%;z-index:2}
      .star-rating-label{font-size:15px;color:var(--color-text-secondary);min-height:22px;margin-top:8px;transition:color .15s}
      .star-rating-label.active{color:var(--color-text-primary);font-weight:500}
      .star-rating-pill{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:8px 16px;border-radius:var(--border-radius-lg,12px);border:.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);font-size:14px;color:var(--color-text-secondary)}
      .star-rating-pill-val{font-size:18px;font-weight:500;color:var(--color-text-primary)}
      .star-rating-clear{background:none;border:.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md,8px);padding:6px 14px;font-size:13px;color:var(--color-text-secondary);cursor:pointer;margin-top:16px;display:none}
      .star-rating-clear:hover{background:var(--color-background-secondary)}
    `;
    document.head.appendChild(style);
  }

  // ── Labels ────────────────────────────────────────────────────────────────
  const LABELS = {
    0.5: "Terrible",
    1: "Poor",
    1.5: "Mediocre",
    2: "Below average",
    2.5: "Average",
    3: "Decent",
    3.5: "Good",
    4: "Great",
    4.5: "Excellent",
    5: "Outstanding",
  };

  const PATH =
    "M7.35718 2.27146C7.64867 1.78711 8.35083 1.78713 8.64234 2.27146L10.4226 5.22947L13.7859 6.00779C14.3366 6.13538 14.5529 6.80356 14.1824 7.23045L11.9197 9.83787L12.2185 13.2773C12.267 13.8403 11.6989 14.2527 11.1785 14.0322L7.99976 12.6855L4.82105 14.0322C4.30067 14.2527 3.73249 13.8403 3.78101 13.2773L4.07984 9.83787L1.81714 7.23045C1.4466 6.80359 1.66302 6.13544 2.21363 6.00779L5.57691 5.22947L7.35718 2.27146Z";

  let hovered = 0;
  let selected = defaultValue;

  // ── SVG builders ─────────────────────────────────────────────────────────
  function starSVG(fill) {
    const id = "sr" + Math.random().toString(36).slice(2);
    const base = `viewBox="0 0 16 16" width="40" height="40" xmlns="http:///www.w3.org/2000/svg"`;
    const p = (color, clip = "") =>
      `<path fill-rule="evenodd" clip-rule="evenodd" d="${PATH}" ${clip} fill="${color}"/>`;

    if (fill === "full") return `<svg ${base}>${p(filledColor)}</svg>`;
    if (fill === "empty") return `<svg ${base}>${p(emptyColor)}</svg>`;
    return `<svg ${base}>
      <defs>
        <clipPath id="${id}l"><rect x="0" y="0" width="8" height="16"/></clipPath>
        <clipPath id="${id}r"><rect x="8" y="0" width="8" height="16"/></clipPath>
      </defs>
      ${p(filledColor, `clip-path="url(#${id}l)"`)}
      ${p(emptyColor, `clip-path="url(#${id}r)"`)}
    </svg>`;
  }

  // ── DOM ───────────────────────────────────────────────────────────────────
  const root = document.createElement("div");
  root.className = "star-rating-wrap";

  // const srLabel = document.createElement('h2');
  // srLabel.className = 'sr-only';
  // srLabel.textContent = 'Star rating input — select between 0 and ' + count + ' stars, half-star increments supported';

  // const heading = document.createElement('p');
  // heading.className = 'star-rating-heading';
  // heading.textContent = 'Your rating';

  const starsEl = document.createElement("div");
  starsEl.className = "star-rating-stars";
  starsEl.setAttribute("role", "radiogroup");
  starsEl.setAttribute("aria-label", "Star rating");

  // const labelEl = document.createElement('div');
  // labelEl.className = 'star-rating-label';
  // labelEl.textContent = selected ? LABELS[selected] : 'Select a rating';
  // if (selected) labelEl.classList.add('active');

  // const resultWrap = document.createElement('div');
  // resultWrap.style.display = selected ? 'block' : 'none';

  // const pill = document.createElement('div');
  // pill.className = 'star-rating-pill';

  // const pillVal = document.createElement('span');
  // pillVal.className = 'star-rating-pill-val';
  // pillVal.textContent = selected ? (selected % 1 === 0 ? selected + '.0' : selected) : '—';

  // const pillText = document.createElement('span');
  // pillText.textContent = '/ ' + count + ' stars';

  // pill.appendChild(pillVal);
  // pill.appendChild(pillText);

  // const clearBtn = document.createElement('button');
  // clearBtn.className = 'star-rating-clear';
  // clearBtn.textContent = 'Clear rating';
  // clearBtn.style.display = selected ? 'inline-block' : 'none';

  // resultWrap.appendChild(document.createElement('br'));
  // resultWrap.appendChild(pill);
  // resultWrap.appendChild(document.createElement('br'));
  // resultWrap.appendChild(clearBtn);

  // root.appendChild(srLabel);
  // root.appendChild(heading);
  root.appendChild(starsEl);
  // root.appendChild(labelEl);
  // root.appendChild(resultWrap);

  // ── Render helpers ────────────────────────────────────────────────────────
  function render(val) {
    Array.from(starsEl.children).forEach((slot, i) => {
      const n = i + 1;
      slot.querySelector(".star-svg").innerHTML = starSVG(
        val >= n ? "full" : val >= n - 0.5 ? "half" : "empty"
      );
    });
  }

  // function updateLabel(val) {
  //   labelEl.textContent = val === 0 ? "Select a rating" : LABELS[val] || "";
  //   labelEl.classList.toggle("active", val !== 0);
  // }

  function selectVal(val) {
    selected = val;
    render(selected);
    // updateLabel(selected);
    // pillVal.textContent = selected % 1 === 0 ? selected + ".0" : selected;
    // resultWrap.style.display = "block";
    // clearBtn.style.display = "inline-block";
    if (typeof onChange === "function") onChange(selected);
  }

  function clearRating() {
    selected = hovered = 0;
    render(0);
    // updateLabel(0);
    // resultWrap.style.display = "none";
    // clearBtn.style.display = "none";
    if (typeof onChange === "function") onChange(null);
  }

  // clearBtn.addEventListener('click', clearRating);

  // ── Build star slots ──────────────────────────────────────────────────────
  for (let i = 1; i <= count; i++) {
    const slot = document.createElement("div");
    slot.className = "star-rating-slot";

    const svgEl = document.createElement("div");
    svgEl.className = "star-svg";
    svgEl.style.cssText =
      "position:absolute;top:0;left:0;width:40px;height:40px";
    svgEl.innerHTML = starSVG(
      selected >= i ? "full" : selected >= i - 0.5 ? "half" : "empty"
    );

    const halfHit = document.createElement("div");
    halfHit.className = "half-hit";
    halfHit.setAttribute("role", "radio");
    halfHit.setAttribute("aria-label", i - 0.5 + " stars");
    halfHit.setAttribute("tabindex", "0");

    const fullHit = document.createElement("div");
    fullHit.className = "full-hit";
    fullHit.setAttribute("role", "radio");
    fullHit.setAttribute("aria-label", i + " stars");
    fullHit.setAttribute("tabindex", "0");

    const n = i;
    halfHit.addEventListener("mouseenter", () => {
      hovered = n - 0.5;
      render(hovered);
      // updateLabel(hovered);
    });
    fullHit.addEventListener("mouseenter", () => {
      hovered = n;
      render(hovered);
      // updateLabel(hovered);
    });
    halfHit.addEventListener("click", () => selectVal(n - 0.5));
    fullHit.addEventListener("click", () => selectVal(n));
    [halfHit, fullHit].forEach((el) =>
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          el.click();
        }
      })
    );

    slot.appendChild(svgEl);
    slot.appendChild(halfHit);
    slot.appendChild(fullHit);
    starsEl.appendChild(slot);
  }

  starsEl.addEventListener("mouseleave", () => {
    hovered = 0;
    render(selected);
    // updateLabel(selected);
  });

  // ── Mount ─────────────────────────────────────────────────────────────────
  const target =
    container instanceof Element
      ? container
      : document.querySelector(container);
  if (target) target.appendChild(root);

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    getValue: () => selected,
    setValue: (val) => selectVal(val),
    clear: clearRating,
    element: root,
  };
}

const rating = createStarRatingInput({
  container: this, // CSS selector or Element (required)
  count: 5, // number of stars (default: 5)
  defaultValue: 3.5, // pre-selected value (default: 0)
  filledColor: "#171717", // filled star color (default: var(--color-text-primary))
  emptyColor: "#ccc", // empty star color  (default: var(--color-border-secondary))
  onChange: (val) => {
    // fires on every selection (null when cleared)
    dispatch("update-rating", {rating: val / 5});
  },
});
