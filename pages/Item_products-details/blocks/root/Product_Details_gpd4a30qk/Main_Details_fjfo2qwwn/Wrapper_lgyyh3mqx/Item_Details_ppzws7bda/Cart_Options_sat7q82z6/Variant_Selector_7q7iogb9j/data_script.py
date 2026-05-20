if bool(props["has_variant"]):
  variants = frappe.call("webshop.webshop.variant_selector.utils.get_attributes_and_values", item_code=props["variant_template_item_code"])

  for index, variant in enumerate(variants):
    variant["values"] = [{"index": index, "name": name} for index, name in enumerate(variant["values"])]
    variants[index]["index"] = index
  block.variants = variants