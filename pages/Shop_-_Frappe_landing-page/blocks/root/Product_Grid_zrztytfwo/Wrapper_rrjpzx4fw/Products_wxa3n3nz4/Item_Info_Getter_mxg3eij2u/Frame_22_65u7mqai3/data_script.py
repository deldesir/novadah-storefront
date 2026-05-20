block.show_price = bool(frappe.call("webshop.webshop.api.show_price")) and not bool(props["is_template"])
block.is_cart_enabled = bool(frappe.call("webshop.webshop.api.is_cart_enabled"))