# 🛍️ Novadah Storefront — Owner & Developer Guide

Welcome to the **Novadah Storefront**, a high-performance, zero-config webshop built on top of **ERPNext** and **Builder**. This storefront features modern **Outfit** typography, sleek indigo glassmorphism gradients, elegant micro-animations, and complete resilience to missing database records.

---

## 🚀 How it Works (Resilience & Auto-Discovery)

Traditional storefronts break or show empty spaces if your database doesn't perfectly match hardcoded values. The Novadah Storefront is engineered with **Zero-Config Resilient Fallbacks**:

1. **Bento Grid (Auto-Discovery)**: Displays your product categories or collections dynamically. If you don't configure specific names, it auto-discovers up to 4 active categories with uploaded images from your ERPNext DB. If no categories exist, the section gracefully hides itself.
2. **Featured Product**: Automatically highlights the newest published `Website Item` if no item code is explicitly specified. If no published items exist, the section hides itself cleanly.
3. **Product Collections**: Auto-selects the first available `Website Collection` and displays up to 4 items in a premium grid. Hides itself if no collections exist.

---

## 👤 For the Store Owner (No-Code Management)

You can manage the entire content of your store directly from the **ERPNext Desk** without touching any code.

### 1. Adding & Managing Products
1. Go to **ERPNext** ➔ **Item** ➔ **New**.
2. Fill in the Item details, set a **Standard Selling Price**, and upload a high-quality product image under **Website Image**.
3. Under the **Website** section, check **Show in Website**.
4. Set the **Website Item Group / Category** to place it in the correct department.
5. Save and Publish. The product will immediately appear on the `/store` page!

### 2. Setting Up Landing Page Categories
The landing page Bento Grid automatically showcases your categories. To make a category look spectacular:
1. Go to **Website Category** or **Item Group** in ERPNext.
2. Upload a beautiful thumbnail or cover image in the **Image** field.
3. Keep the category enabled. The Bento Grid will auto-discover it and render it beautifully.

---

## 🛠️ For Developers & Admins (Deployment & Sync)

The storefront definitions are version-controlled using Git and synced with the database using `builder-cli`.

### 1. The Deployment Pipeline
```
┌─────────────────┐     builder pull     ┌──────────────────────┐
│  Staging Server │ ───────────────────→ │  novadah-storefront  │
│  (novadah.net)  │                      │  (Git Repository)    │
└─────────────────┘                      └──────────────────────┘
                                                    │
                                                git push
                                                    │
                                                    ▼
                                         ┌──────────────────────┐
                                         │    GitHub Remote     │
                                         └──────────────────────┘
                                                    │
                                                git pull
                                                    │
                                                    ▼
┌─────────────────┐     builder push     ┌──────────────────────┐
│  Production     │ ←─────────────────── │  novadah-storefront  │
│ (michocell.com) │                      │  (on deploy server)  │
└─────────────────┘                      └──────────────────────┘
```

### 2. Syncing Changes manually
If you customize components or page structures via the **Builder UI** on staging, pull them into the repository to save them:
```bash
# Pull database changes into local JSON files
builder pull
```

To deploy those changes to production (or restore them on a fresh server):
```bash
# Push JSON files into the ERPNext database
builder push
```

### 3. Automated Deployment via Ansible (IIAB Integration)
The storefront is fully integrated into the **IIAB (Internet-in-a-Box)** configuration framework. During `iiab-install` or when updating ERPNext, IIAB will:
1. Fetch the latest `builder-cli` and build it.
2. Fetch the latest `novadah-storefront` pages/components.
3. Automatically retrieve secure cleartext API tokens for the Administrator.
4. Run `builder push` to populate the ERPNext instance in one zero-touch command.

---

## 🛡️ Technical Design & Resiliency Rules
- **Safe Calls**: Every data fetching script must wrap `frappe.call()` in a `try/except` block to prevent page-wide crashes if an API signature changes or becomes unavailable.
- **Section Visibility**: Every component must compute a `block.visible` boolean based on whether actual data exists, and hook it to `visibilityCondition` under the root element to hide empty sections gracefully.
- **Out of Sandbox Safety**: We inherit `SafeDict` from `frappe._dict` to pass signature validation in strictly-typed environments.
