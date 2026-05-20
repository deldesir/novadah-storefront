block.same_address = block.get("cart_data").get("cart_quotation").get("customer_address") == block.get("cart_data").get("cart_quotation").get("shipping_address_name")

block.block_data = { "same_address" : block.same_address }
