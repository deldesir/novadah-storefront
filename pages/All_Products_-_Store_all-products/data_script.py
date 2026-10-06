# ==== /store (All Products) — page_data_script ====
# Runs in Builder's page-data sandbox (frappe.db.get_all/count, get_doc, get_cached_doc,
# get_single_value, as_json, frappe.form_dict). No frappe.call: the sandbox no longer
# exposes it, so the webshop lookups the page needs are done here with the same rules
# as webshop.webshop.api (list_items/total_items/list_categories/list_collections/get_item_price).
# Every top-level var referenced by dynamicValues/dataKey bindings is set on `data`.

settings = frappe.get_cached_doc("Webshop Settings", "Webshop Settings")

# --- filters from query params ---
selected_categories = frappe.form_dict.Categories.split(",") if frappe.form_dict.Categories else []
selected_collections = frappe.form_dict.Collections.split(",") if frappe.form_dict.Collections else []
filters = {}
if len(selected_categories):
    filters["category"] = {"id": selected_categories, "subtree": True}
if len(selected_collections):
    filters["collection"] = selected_collections
data.filters = as_json(filters)
data.selected_categories = frappe.form_dict.Categories or ""
data.selected_collections = frappe.form_dict.Collections or ""

# --- filter sidebar options (same shape as list_collections / list_categories) ---
data.collections = as_json(frappe.db.get_all(
    "Website Collection", fields=["name", "collection_image", "description"], order_by="creation desc"
) or [])
root = frappe.get_doc("Website Category", "All Website Categories")
data.categories = as_json(frappe.db.get_all(
    "Website Category",
    filters={"lft": [">", root.get("lft")], "rgt": ["<", root.get("rgt")]},
    fields=["name", "category_image", "description"],
    order_by="lft asc",
) or [])

# --- pagination ---
page = 1
if frappe.form_dict.page:
    try:
        page = int(frappe.form_dict.page)
    except Exception:
        pass

hide_variants = bool(settings.get("hide_variants"))
products_per_page = int(settings.get("products_per_page") or 20)

# --- the item query: published, optional variant exclusion, category subtree, collections ---
def junction_items(ids, parenttype):
    rows = frappe.db.get_all(
        "Website Item Table",
        filters={"parent": ["in", ids], "parenttype": parenttype, "parentfield": "website_items"},
        fields=["website_item"],
    )
    return [r.get("website_item") for r in rows]

item_filters = [["Website Item", "published", "=", 1]]
if hide_variants:
    item_filters.append(["Website Item", "variant_of", "is", "not set"])
if selected_categories:
    bounds = frappe.db.get_all("Website Category", filters={"name": ["in", selected_categories]}, fields=["lft", "rgt"])
    names = []
    for b in bounds:
        names = names + [c.get("name") for c in frappe.db.get_all(
            "Website Category", filters={"lft": [">=", b.get("lft")], "rgt": ["<=", b.get("rgt")]}, fields=["name"]
        )]
    item_filters.append(["Website Item", "name", "in", (junction_items(names, "Website Category") if names else []) or [""]])
if selected_collections:
    item_filters.append(["Website Item", "name", "in", junction_items(selected_collections, "Website Collection") or [""]])

total_items = frappe.db.count("Website Item", filters=item_filters)
data.total_items = total_items

offset = products_per_page * (page - 1)
overflowed = offset >= total_items
items = frappe.db.get_all(
    "Website Item",
    filters=item_filters,
    fields=["*"],
    order_by="ranking desc, creation desc",
    limit_page_length=products_per_page,
    limit_start=offset if not overflowed else 0,
) or []
page = page if not overflowed else 1
data.page = page
data.more_pages = ((page - 1) * products_per_page + len(items)) < total_items

# --- prices (get_price's Item Price lookup in the shop price list; pricing rules are not applied here) ---
show_prices = bool(settings.get("enabled")) and bool(settings.get("show_price")) and not (
    frappe.session.user == "Guest" and bool(settings.get("hide_price_for_guest"))
)
price_list = settings.get("price_list")
number_format = frappe.db.get_single_value("System Settings", "number_format") or "#,###.##"

def fmt_money(amount, currency):
    decimals = 2 if "." in number_format[-3:] or "," in number_format[-3:] and number_format.endswith(",##") else 0
    if number_format in ("#,###", "#.###", "# ###", "#"):
        decimals = 0
    s = f"{float(amount or 0):,.{decimals}f}"
    if number_format.startswith("#.###"):
        s = s.replace(",", "X").replace(".", ",").replace("X", ".")
    elif number_format.startswith("# ###"):
        s = s.replace(",", " ")
    elif number_format.startswith("#'###"):
        s = s.replace(",", "'")
    cur = frappe.get_cached_doc("Currency", currency) if currency else {}
    symbol = (cur.get("symbol") or currency or "") if cur else ""
    if cur and cur.get("symbol_on_right"):
        return f"{s} {symbol}".strip()
    return f"{symbol} {s}".strip()

prices = {}
if show_prices and price_list and items:
    codes = []
    for it in items:
        if not it.get("has_variants"):
            codes.append(it.get("item_code"))
            if it.get("variant_of"):
                codes.append(it.get("variant_of"))
    for row in frappe.db.get_all(
        "Item Price",
        filters={"price_list": price_list, "item_code": ["in", codes], "selling": 1},
        fields=["item_code", "price_list_rate", "currency"],
        order_by="valid_from desc",
    ):
        prices.setdefault(row.get("item_code"), row)

# --- pre-compute per-item derived fields ---
def enrich(item):
    if not item:
        return item
    name = item.get("name")
    item["route"] = f"/item/{name}"
    price = None
    if show_prices and not item.get("has_variants"):
        price = prices.get(item.get("item_code")) or (prices.get(item.get("variant_of")) if item.get("variant_of") else None)
    item["item_price"] = fmt_money(price.get("price_list_rate"), price.get("currency")) if price else ""
    item["is_template"] = bool(item.get("has_variants"))
    if not item.get("website_image"):
        item["website_image"] = ""
    return item

data.items = [enrich(it) for it in items if it]
