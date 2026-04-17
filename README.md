# ב.ר חומרי בניין — Full Stack E-Commerce

## Setup

### Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```
MONGO_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/homrey-binyan
CLIENT_URL=http://localhost:3000
PORT=5000
JWT_SECRET=<long-random-string>
JWT_LIFETIME=8h
ADMIN_PASSWORD=<your-secure-password>

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_TO=store-owner@gmail.com
```

### Frontend
```bash
cd client
npm install
```

Create `client/.env`:
```
REACT_APP_SERVER_URL=http://localhost:5000
```

### Run both
```bash
cd backend && npm start
```

---

## 📧 Email Setup (Gmail App Password)

Orders are sent by email using **Gmail + Nodemailer**. This is free and requires no account creation beyond your existing Gmail. Here is exactly what to do:

### Step 1 — Enable 2-Factor Authentication
1. Go to **myaccount.google.com**
2. Click **Security** → **2-Step Verification** → turn it on if not already

### Step 2 — Create an App Password
1. Go to **myaccount.google.com/apppasswords**
2. Under "App name" type anything, e.g. `Homrey Store`
3. Click **Create**
4. Google shows a **16-character password** like `abcd efgh ijkl mnop`
5. Copy it — you only see it once

### Step 3 — Add to .env
```
EMAIL_USER=your-store-gmail@gmail.com   ← the Gmail you used above
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop  ← the 16-char password (spaces are fine)
EMAIL_TO=owner@gmail.com                ← where orders get delivered
```

That's it. No paid service, no domain, no credit card.

---

## 🖼 Image Hosting (Cloudinary)

Sign up at **cloudinary.com** (free tier: 25GB storage + 25GB bandwidth/month).

After signing up:
1. Go to the **Dashboard**
2. Copy **Cloud Name**, **API Key**, **API Secret**
3. Paste into `backend/.env`

Images are uploaded directly from the browser to Cloudinary — they never pass through your server.

---

## Features

### Live Search
The search bar in the header shows instant results as you type, with matched letters highlighted in yellow. Results include product image, name, SKU, and price.

### מק"ט (SKU)
Auto-generated as `BR-000001`, `BR-000002`, etc. Admins can override with a custom value. Searchable in both the header and the admin panel.

### Admin Panel (`/admin`)
- Password-protected (JWT, 8h session)
- **Tab 1:** Add new products with image drag-and-drop upload
- **Tab 2:** Search by name or SKU, edit inline, delete with confirm

### Product Page
- Full-width image on mobile, sticky side panel on desktop
- Color swatches, quantity stepper, animated add-to-cart button
- Skeleton loader while fetching, friendly error screen

### Order Flow
- Cart → Order page with summary sidebar + contact form
- On submit, a formatted HTML email is sent to `EMAIL_TO`
- Customer's email is set as reply-to so you can reply directly
- Cart clears on successful send
