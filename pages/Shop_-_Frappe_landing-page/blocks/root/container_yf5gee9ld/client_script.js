let container = document.getElementById("toast-container");

if (!container) {
  container = document.createElement("div");
  container.id = "toast-container";
  Object.assign(container.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 9999,
  });
  document.body.appendChild(container);
}

const STYLES = {
  base: {
    background: "#fff",
    color: "#111",
    border: "1px solid #eee",
  },
  success: {
    // background: "#f0fdf4",
    // border: "1px solid #bbf7d0",
    icon: "✓",
    iconColor: "#16a34a",
  },
  warning: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    icon: "⚠",
    iconColor: "#d97706",
  },
  error: {
    icon: "✕",
    iconColor: "#dc2626",
  },
  info: {
    icon: "i",
    iconColor: "#2563eb",
  },
};

function createToast({ message, type = "info", duration = 3000 }) {
  const toast = document.createElement("div");

  const style = {
    ...STYLES.base,
    ...(STYLES[type] || {}),
  };

  Object.assign(toast.style, {
    minWidth: "220px",
    maxWidth: "320px",
    padding: "10px 14px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transform: "translateX(120%)",
    opacity: "0",
    transition: "all 0.25s ease",
    cursor: "pointer",
    ...style,
  });

  // Icon
  const icon = document.createElement("span");
  icon.textContent = style.icon || "";
  Object.assign(icon.style, {
    fontSize: "14px",
    fontWeight: "600",
    color: style.iconColor || "#666",
  });

  // Message
  const text = document.createElement("span");
  text.textContent = message;
  Object.assign(text.style, {
    flex: "1",
  });

  toast.appendChild(icon);
  toast.appendChild(text);

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = "translateX(0)";
    toast.style.opacity = "1";
  });

  const remove = () => {
    toast.style.transform = "translateX(120%)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  };

  const timeout = setTimeout(remove, duration);

  toast.addEventListener("click", () => {
    clearTimeout(timeout);
    remove();
  });
}

document.addEventListener("show-toast", (e) => {
  const { message, type, duration } = e.detail || {};
  if (!message) return;
  if (!this.dataset.blockId)
    createToast({ message, type, duration });
});
