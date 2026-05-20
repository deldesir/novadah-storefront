def as_json(val):
  return frappe.call("webshop.webshop.utils.misc.as_json", val=val)
  
block.collections = as_json(frappe.call("webshop.webshop.api.list_collections"))
block.categories = as_json(frappe.call("webshop.webshop.api.list_categories"))
block.selected_categories = frappe.form_dict.Categories or ""
block.selected_collections = frappe.form_dict.Collections or ""