price = frappe.call("webshop.webshop.api.get_item_price",  item_code = block.name) or {}
block.item_price = price.get("formatted_price", "")

block.is_template = bool(block.has_variants)