block.cart_data = frappe.call("webshop.webshop.api.get_cart")

block.is_cart_empty = not bool(len(block.cart_data.get("cart_quotation").get("items")))




