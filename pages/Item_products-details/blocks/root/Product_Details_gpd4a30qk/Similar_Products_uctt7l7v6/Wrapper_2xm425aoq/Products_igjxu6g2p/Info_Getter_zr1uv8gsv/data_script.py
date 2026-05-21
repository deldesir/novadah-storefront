price = frappe.call("webshop.webshop.api.get_item_price", item_code = block.website_item) or {}
block.item_price = price.get("formatted_price", "")

block.is_template = bool(block.has_variants)
block.route = f"/item/{block.website_item}"