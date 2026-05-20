web_item_code = frappe.form_dict.item_code
if web_item_code:
    details = frappe.call("webshop.webshop.api.get_item", item_code=web_item_code, combine_template=True)

    block.item_details = details.product_info
    block.cart_settings = details.cart_settings

    has_variants = block.item_details.get("details").get("has_variants", False) if block.item_details else False
    variant_of = block.item_details.get("details").get("variant_of", None) if block.item_details else None

    block.show_variant_selector = bool(has_variants or variant_of)
    if has_variants or variant_of:
        block.show_variant_selector = bool(has_variants or variant_of)
        block.variant_template_item_code = (
            block.item_details.get("details").get("item_code")
            if has_variants
            else variant_of
        )

    block.has_specs = bool(
        len(details.product_info.get("details").get("website_specifications"))
    ) if details.product_info else False

    images = []
    if details.product_info and details.product_info.get("details").get("website_image"):
        images.append({"url": details.product_info.get("details").get("website_image")})
    if block.item_details and len(block.item_details.get("slideshow", {}).get("slideshow_items", {})):
        for item in block.item_details.get("slideshow", {}).get("slideshow_items", {}):
            images.append({"url": item.get("image")})
    block.images = images
    block.initially_selected_image = images[0] if len(images) else None
    block.has_image = bool(len(images))

    if block.item_details and block.item_details.get("attributes"):
        selected_attributes = {}
        for item in block.item_details.get("attributes"):
            selected_attributes[item.get("attribute")] = item.get("attribute_value")
        block.selected_attribute = frappe.call(
            "webshop.webshop.utils.misc.as_json",
            val=block.item_details.get("attributes"),
        )

# Reviews: only run if we have item_details
if getattr(block, "item_details", None):
    review_page = frappe.form_dict.review_page or 1

    block.review_data = frappe.call(
        "webshop.webshop.doctype.item_review.item_review.get_item_reviews",
        web_item=block.item_details.get("details").get("name"),
        start=0,
        end=10 * review_page,
        no_cache=True,
    ) or {}

    r_rating = block.review_data.get("reviews_per_rating") or [0, 0, 0, 0, 0]
    r_count = block.review_data.get("reviews_per_rating_count") or [0, 0, 0, 0, 0]
    block.combined_reviews_per_rating = [
        {
            "percent": r_rating[i] if i < len(r_rating) else 0,
            "count": r_count[i] if i < len(r_count) else 0,
            "index": i + 1,
        }
        for i in range(5)
    ]
    block.combined_reviews_per_rating.reverse()
    block.block_data = { "title" : block.item_details.get("details", {}).get("web_item_name", "") }
else:
    block.review_data = {}
    block.combined_reviews_per_rating = []
    block.block_data = { "title" : "" }