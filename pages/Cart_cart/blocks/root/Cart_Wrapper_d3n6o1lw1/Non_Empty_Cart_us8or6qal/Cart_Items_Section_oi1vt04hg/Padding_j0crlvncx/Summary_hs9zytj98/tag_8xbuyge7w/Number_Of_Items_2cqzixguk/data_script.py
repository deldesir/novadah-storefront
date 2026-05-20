no_of_items = len(block.cart_data.get("cart_quotation").get("items"))

block.no_of_items = f"{no_of_items} item" + ("s" if no_of_items > 1 else "")