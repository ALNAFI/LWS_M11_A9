# Gadget Hub

A full-stack e-commerce marketplace for buying and selling premium tech products. Built with Next.js 14 (App Router), MongoDB, and NextAuth. Supports customer shopping, shop-owner seller central, orders, reviews, and invoice emails with PDF attachment.

---

## Features

### For customers
- **Browse** – Home, product listing with filters (category, brand, price, etc.), product details
- **Shops** – List shops, shop detail page with products
- **Cart** – Add/remove items, persist cart (DB when logged in, in-memory for guests)
- **Checkout** – Address & payment flow, delivery fee (free over ৳50,000), service fee
- **Orders** – My orders (bookings), order details, cancel order, download invoice PDF
- **Reviews** – One review per user per product; edit/delete own review; only purchasers can review
- **Auth** – Email/password login and register, Google sign-in, forgot/reset password

### For shop owners
- **Profile** – Shop profile (name, location, banner, description, specialization)
- **Add/Edit products** – Create and edit products with image upload (ImageKit)
- **Manage inventory** – Product list, publish/unpublish, delete, search/filter
- **Orders** – Shop view of orders containing their products; update item status (Pending → Confirmed → Shipped → Delivered)

### General
- **Invoice** – PDF invoice per order; sent by email on order placement (with PDF attached)
- **Role-based UI** – Nav and pages adapt for customer vs shop owner
- **Responsive UI** – Tailwind CSS, Next.js `Image` for optimized images

---

## Tech stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework   | Next.js 14 (App Router)              |
| UI          | React 18, Tailwind CSS, Lucide React |
| Auth        | NextAuth (credentials + Google)     |
| Database    | MongoDB (Mongoose)                   |
| Email       | Nodemailer (Gmail/SMTP)              |
| PDF         | PDFKit (invoices)                   |
| Images      | Next/Image, ImageKit (upload)        |

---

## Project structure

```
app/
├── (pages)/              # Route group: main app pages
│   ├── page.js           # Home
│   ├── products/         # Product listing
│   ├── details/          # Product detail (?productId=)
│   ├── cart/
│   ├── paymentProcess/    # Checkout
│   ├── success/          # Order confirmation
│   ├── bookings/         # My orders
│   ├── shop/             # Shops list, shop/[id], shop/orders
│   ├── create/           # Add product, create/edit/[id]
│   ├── manageList/       # Manage products (shop owner)
│   ├── profile/          # Shop profile (shop owner)
│   ├── review/           # Review page (also modal from details)
│   └── auth/             # login, register, forgetPassword, reset-password
├── api/
│   ├── auth/             # login, register, logout, me, forgot-password, reset-password
│   ├── cart/             # GET, PUT (sync cart)
│   ├── orders/           # GET list, POST create, [id] GET, cancel, invoice, item-status, reorder
│   ├── orders/has-purchased/
│   ├── products/         # GET list, POST create, [id] GET/PATCH/DELETE
│   ├── reviews/          # GET list, POST create, [id] PATCH/DELETE
│   ├── shops/            # GET list, [id] GET
│   ├── profile/          # PATCH
│   └── upload/image/     # POST (ImageKit)
├── components/           # React components (auth, cart, details, paymentProcess, etc.)
├── context/              # CartContext
├── lib/                  # auth, email, tokens, invoicePdf
├── models/                # User, Product, Order, Cart, Review, RefreshToken, PasswordResetToken
├── dbConnect/             # connectMongo
└── config/                # metadata
```

---

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Gmail/Google OAuth credentials (for login and email)

### Installation

```bash
git clone <repo-url>
cd lwsm11a9
npm install
```

### Environment variables

Create a `.env` file in the project root:

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000` or production URL) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_PASS` | Gmail app password (or use `SMTP_*` for other SMTP) |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key (for image upload) |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

Optional: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `APP_URL`, `JWT_SECRET`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

Private. Part of Learn With Sumit assignment (LWS M11 A9).
