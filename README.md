# Aukro - Auction & Classified Ads Platform

A modern auction and classified ads website built with Ruby on Rails 7.

## Features

- **User Authentication**: Secure user registration and login system
- **Dual Listing Types**: 
  - Classified ads with fixed pricing
  - Auction listings with bidding functionality
- **Category System**: Browse listings by categories (Electronics, Vehicles, Real Estate, Fashion, Home & Garden, Sports & Hobbies)
- **Bidding System**: Place bids on auction listings with automatic validation
- **Responsive Design**: Mobile-friendly interface with modern CSS

## Tech Stack

- **Framework**: Ruby on Rails 7.2.3
- **Ruby Version**: 3.2.3
- **Database**: SQLite3
- **Authentication**: BCrypt for secure password hashing
- **Frontend**: Turbo, Stimulus, and modern CSS

## Getting Started

### Prerequisites

- Ruby 3.2.3 or higher
- Rails 7.2.3
- SQLite3

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amigobg/aukro.git
cd aukro
```

2. Install dependencies:
```bash
bundle install
```

3. Set up the database:
```bash
rails db:migrate
rails db:seed
```

4. Start the server:
```bash
rails server
```

5. Visit `http://localhost:3000` in your browser

### Default Test Accounts

After seeding, you can log in with:
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

## Usage

### Creating a Listing

1. Sign up or log in
2. Click "Post Listing" in the navigation
3. Fill in the listing details
4. Choose between "Classified" or "Auction" type
5. Submit your listing

### Bidding on Auctions

1. Browse auction listings
2. Click on an auction to view details
3. Enter your bid amount (must be higher than current price)
4. Submit your bid

### Browsing

- View all listings on the listings page
- Filter by type (Auctions or Classifieds)
- Browse by category
- View bid history on auction items

## Database Schema

### Models

- **User**: Manages user accounts with authentication
- **Category**: Organizes listings into categories
- **Listing**: Represents both classified and auction listings
- **Bid**: Tracks bids placed on auction listings

## Testing

Run the test suite:
```bash
rails test
```

## Deployment

The application includes Docker support. See `Dockerfile` for containerization.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
