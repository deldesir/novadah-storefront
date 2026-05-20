block.categories = frappe.call("webshop.webshop.api.list_collections") or {}

for item in block.categories:
    if not item: continue
    item["route"] = f"/erp/category/{item.name}"

block.total_items = len(block.categories)