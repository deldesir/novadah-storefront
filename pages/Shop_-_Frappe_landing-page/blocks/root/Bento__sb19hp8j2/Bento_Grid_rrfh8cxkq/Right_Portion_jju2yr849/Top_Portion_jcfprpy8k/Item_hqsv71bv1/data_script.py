category_url = "webshop.webshop.api.get_category"
collection_url = "webshop.webshop.api.get_collection"

url_to_use = category_url if props["type"] == "Category" else collection_url

if props["name"]:
  try:
    block.details = frappe.call(url_to_use, name = props["name"], raise_redirect = True)
    block.details.image = block.details.category_image if props["type"] == "Category" else block.details.collection_image
  except Exception as e:
    block.err = e

block.route = ("/category/" if props["type"] == "Category" else "/collection/") + props["name"]