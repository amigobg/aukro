module ApplicationHelper
  def react_component(name, props = {}, html_options = {})
    options = html_options.deep_dup
    options[:data] ||= {}
    options[:data][:react_class] = name
    options[:data][:react_props] = props.to_json
    classes = [options[:class], "react-mount"].compact.join(" ")
    options[:class] = classes.presence
    tag.div("", **options)
  end

  def navigation_props
    token = form_authenticity_token

    {
      appName: "Aukro",
      homePath: root_path,
      currentPath: request.path,
      links: [
        { label: "Categories", href: categories_path, active: request.path.start_with?(categories_path) },
        { label: "Listings", href: listings_path, active: request.path.start_with?(listings_path) }
      ],
      auth: if user_signed_in?
        {
          signedIn: true,
          email: current_user.email,
          newListingPath: new_listing_path,
          signOut: {
            path: destroy_user_session_path,
            method: "delete",
            authenticityToken: token
          }
        }
      else
        {
          signedIn: false,
          signInPath: new_user_session_path,
          registerPath: new_user_registration_path
        }
      end
    }
  end

  def flash_props
    {
      notice: flash[:notice],
      alert: flash[:alert]
    }
  end

  def category_payload(category)
    return unless category

    {
      id: category.id,
      name: category.name,
      description: category.description,
      path: category_path(category)
    }
  end

  def category_payloads(categories)
    Array(categories).filter_map { |category| category_payload(category) }
  end

  def listing_card_payload(listing)
    return unless listing

    category = listing.category
    {
      id: listing.id,
      title: listing.title,
      price: listing.formatted_price,
      path: listing_path(listing),
      selling_type: listing.selling_type,
      selling_label: listing.auction? ? "Auction" : "Buy Now",
      badge_variant: listing.auction? ? "destructive" : "success",
      image_url: listing.images.attached? ? url_for(listing.images.first) : nil,
      category: category ? { name: category.name, path: category_path(category) } : nil,
      auction_ends_at: listing.auction_ends_at&.iso8601,
      condition: listing.condition&.titleize,
      status: listing.status&.titleize
    }
  end

  def listing_card_payloads(listings)
    Array(listings).filter_map { |listing| listing_card_payload(listing) }
  end

  def listing_detail_payload(listing)
    base = listing_card_payload(listing) || {}
    owner_controls = user_signed_in? && listing.user_id == current_user.id

    base.merge(
      description: listing.description,
      quantity: listing.quantity,
      selling_type_label: listing.selling_type.titleize,
      currency: listing.currency,
      images: listing.images.map { |image| url_for(image) },
      auction_ends_at_full: listing.auction_ends_at&.iso8601,
      owner_controls: {
        can_manage: owner_controls,
        edit_path: owner_controls ? edit_listing_path(listing) : nil,
        delete_path: owner_controls ? listing_path(listing) : nil
      },
      bid: listing_bid_payload(listing)
    )
  end

  def auth_form_field(name, label:, id:, type: "text", value: nil, placeholder: nil, autocomplete: nil, required: true, hint: nil, checked: nil)
    {
      name: name,
      label: label,
      id: id,
      type: type,
      value: value.presence,
      placeholder: placeholder,
      autocomplete: autocomplete,
      required: required,
      hint: hint,
      checked: checked
    }.compact
  end

  def auth_page_props(resource:, resource_name:, heading:, subheading:, submit_label:, action:, method: :post, fields:, links: [], meta: {})
    {
      heading: heading,
      subheading: subheading,
      form: {
        action: action,
        method: method.to_s,
        authenticity_token: form_authenticity_token,
        submit_label: submit_label,
        fields: fields
      },
      errors: resource.errors.full_messages,
      links: links,
      meta: meta
    }
  end

  def listing_form_fields(listing)
    categories = Category.order(:name).pluck(:name, :id)
    {
      basics: [
        {
          type: "text",
          name: "listing[title]",
          id: "listing_title",
          label: "Listing title",
          placeholder: "Vintage camera bundle",
          value: listing.title,
          required: true
        },
        {
          type: "textarea",
          name: "listing[description]",
          id: "listing_description",
          label: "Description",
          placeholder: "Describe the item, condition, shipping details...",
          value: listing.description,
          required: true,
          full_width: true
        }
      ],
      categorization: [
        {
          type: "select",
          name: "listing[category_id]",
          id: "listing_category_id",
          label: "Category",
          placeholder: "Select category",
          value: listing.category_id,
          options: categories.map { |name, id| { label: name, value: id } },
          required: false
        },
        {
          type: "select",
          name: "listing[condition]",
          id: "listing_condition",
          label: "Condition",
          placeholder: "Select condition",
          value: listing.condition,
          options: Listing.conditions.keys.map { |key| { label: key.titleize, value: key } },
          required: false
        },
        {
          type: "select",
          name: "listing[selling_type]",
          id: "listing_selling_type",
          label: "Selling type",
          placeholder: "Select selling type",
          value: listing.selling_type,
          options: Listing.selling_types.keys.map { |key| { label: key.titleize, value: key } },
          required: true
        },
        {
          type: "select",
          name: "listing[status]",
          id: "listing_status",
          label: "Status",
          placeholder: "Select status",
          value: listing.status,
          options: Listing.statuses.keys.map { |key| { label: key.titleize, value: key } },
          required: true
        }
      ],
      pricing: [
        {
          type: "number",
          name: "listing[quantity]",
          id: "listing_quantity",
          label: "Quantity",
          placeholder: "1",
          value: listing.quantity,
          step: 1
        },
        {
          type: "number",
          name: "listing[starting_price_cents]",
          id: "listing_starting_price_cents",
          label: "Starting price (cents)",
          placeholder: "1000 for $10.00",
          value: listing.starting_price_cents
        },
        {
          type: "number",
          name: "listing[buy_now_price_cents]",
          id: "listing_buy_now_price_cents",
          label: "Buy now price (cents)",
          placeholder: "Optional",
          value: listing.buy_now_price_cents
        },
        {
          type: "datetime-local",
          name: "listing[auction_ends_at]",
          id: "listing_auction_ends_at",
          label: "Auction ends at",
          value: listing.auction_ends_at&.strftime("%Y-%m-%dT%H:%M")
        },
        {
          type: "text",
          name: "listing[currency]",
          id: "listing_currency",
          label: "Currency",
          placeholder: "USD",
          value: listing.currency || "USD"
        }
      ],
      logistics: [
        {
          type: "text",
          name: "listing[shipping_type]",
          id: "listing_shipping_type",
          label: "Shipping method",
          placeholder: "Economy, Express, etc.",
          value: listing.shipping_type
        },
        {
          type: "number",
          name: "listing[shipping_price_cents]",
          id: "listing_shipping_price_cents",
          label: "Shipping price (cents)",
          placeholder: "e.g. 500",
          value: listing.shipping_price_cents
        }
      ],
      media: [
        {
          type: "file",
          name: "listing[images][]",
          id: "listing_images",
          label: "Upload images",
          multiple: true,
          hint: "Add up to 10 high resolution images.",
          full_width: true
        }
      ]
    }
  end

  def listing_form_props(listing:, heading:, subheading:, submit_label:, action:, method:, back_path: listings_path)
    {
      heading: heading,
      subheading: subheading,
      form: {
        action: action,
        method: method.to_s,
        authenticity_token: form_authenticity_token,
        submit_label: submit_label,
        field_groups: listing_form_fields(listing),
        multipart: true
      },
      errors: listing.errors.full_messages,
      cancel_path: back_path
    }
  end

  def listing_bid_payload(listing)
    return nil unless listing.auction?

    current_bid_cents = listing.starting_price_cents.to_i
    minimum_bid_cents = current_bid_cents + 100

    amount_decimal = minimum_bid_cents.to_f / 100.0

    {
      can_bid: user_signed_in? && current_user.id != listing.user_id,
      action: bid_listing_path(listing),
      authenticity_token: form_authenticity_token,
      current_bid: listing.formatted_price,
      minimum_bid_display: number_to_currency(amount_decimal),
      minimum_bid_cents: minimum_bid_cents,
      min_amount: amount_decimal.round(2),
      sign_in_path: new_user_session_path,
      requires_login: !user_signed_in?,
      is_owner: user_signed_in? && current_user.id == listing.user_id
    }
  end
end
