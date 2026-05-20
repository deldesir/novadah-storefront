if props.get("collection_name"):
    collection = frappe.call("webshop.webshop.api.get_collection", name=props["collection_name"], raise_redirect=True)
    if collection and getattr(collection, "website_items", None):
        collection.website_items = collection.website_items[0:4]
else:
    collection = {}

block.collection = collection