collection_name = frappe.form_dict.name or 'dummy'

block.collection_details = frappe.call("webshop.webshop.api.get_collection", name=collection_name) or {}

collection_exists = bool(block.collection_details)
block.collection_exists = collection_exists

selected_collections = [collection_name]

filters = {}

if len(selected_collections):
  filters["collection"] = selected_collections

page = 1

if frappe.form_dict.page:
  try:
    page = int(frappe.form_dict.page)
  except:
    pass

def fill_missing_keys(data, keys, default="N/erp/A"):
    def is_null(value):
        return value is None or value == "" or value == [] or value == {}

    for key in keys:
        if key not in data or is_null(data[key]):
            data[key] = default

    return data


hide_variants = bool(frappe.call("webshop.webshop.api.hide_variant_in_product_list"))
products_per_page = frappe.call("webshop.webshop.api.products_per_page")

total_items = frappe.call(
    "webshop.webshop.api.total_items", filters=filters, exclude_variants=hide_variants
) if collection_exists else 0

block.total_items = total_items

offset = products_per_page * (page - 1)
overflowed = offset >= total_items

items = frappe.call(
    "webshop.webshop.api.list_items",
    filters=filters,
    limit=products_per_page,
    offset=offset if not overflowed else 0,
    exclude_variants=hide_variants,
) if collection_exists else []

page = page if not overflowed else 1
if (page - 1) * products_per_page + len(items) < total_items:
    block.more_pages = True
else:
    block.more_pages = False
block.page = page


for item in items:
    if not item: continue
    item["route"] = f"/item/{item.name}"

block.items = [fill_missing_keys(item, ["website_image"], "") for item in items]

block.block_data = { "redirect" : not collection_exists, "title" : block.collection_details.get("name", "") }