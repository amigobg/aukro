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
      }
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
end
