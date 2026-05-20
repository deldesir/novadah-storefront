selected_categories = (frappe.form_dict.Categories).split(",") if frappe.form_dict.Categories else ""
selected_collections = (frappe.form_dict.Collections).split(",") if frappe.form_dict.Collections else ""

filters = {}

if len(selected_categories):
  filters["category"] = {"id": selected_categories, "subtree": True}

if len(selected_collections):
  filters["collection"] = selected_collections

block.filters = frappe.call("webshop.webshop.utils.misc.as_json", val=filters)