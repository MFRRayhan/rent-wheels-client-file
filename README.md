# 🚗 RentWheels – MERN Car Rental Platform

A full-stack car rental application that connects users with local car owners and rental providers. Users can browse cars, view details, book rentals, and manage bookings — while providers can list, update, and manage their car listings. Built with **React, Node.js, Express & MongoDB** and designed with a fully responsive UI.

🔗 **Live Client:** https://rent-wheels-9b557.web.app/
🔗 **Live Server:** https://rent-wheels-api-server.vercel.app/

📁 **Client Repository:** https://github.com/MFRRayhan/rent-wheels-client-file
📁 **Server Repository:** https://github.com/MFRRayhan/rent-wheels-server-file

## 🌟 Project Features

- 🔐 **Authentication System**

  - Email & Password Login
  - Google Login
  - Protected private routes
  - Persistent login (reload করলে logout হবে না)

- 🚘 **Car Management**

  - Add a car (name, image, price, category, provider info)
  - Update car details
  - Delete car (with confirmation)
  - Provider-specific listings: _My Listings_
  - Image hosting via direct URL

- 📅 **Car Booking System**

  - Book cars with user info
  - Prevent double-booking
  - Status updates: **Available / Booked / Unavailable**
  - _My Bookings_ page for users
  - Toast notifications for success/error

- 🔍 **Browse & Search**

  - Public Browse Cars page
  - Search by car name
  - Filter newest 6 cars on Home page
  - Dynamic data fetched from MongoDB

- 🎨 **Modern & Responsive UI**

  - Clean layout with Tailwind CSS
  - Attractive hero slider
  - 4-feature “Why Rent With Us” section
  - Extra Sections: Top Rated Cars, Customer Testimonials

- 🧭 **Routing & UX Enhancements**

  - Full SPA with React Router DOM
  - No reload routing errors
  - Custom loading spinner
  - Beautiful 404 page (no navbar/footer)

- 🎭 **Animations**
  - Swiper slider
  - AOS fade-in effects
  - Optional: Framer Motion (if used)

## 🏗️ Tech Stack

### Frontend (Client)

- React.js
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Swiper.js
- AOS Animation
- React Hot Toast
- Axios

### Backend (Server)

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (optional)
- CORS

### Hosting

- **Client:** Firebase Hosting
- **Server:** Vercel
- **Database:** MongoDB Atlas

# ✨ Main Pages & Features

## 🏠 Home Page

- Hero banner with meaningful slides
- Featured Cars (newest 6 from DB)
- Why Rent With Us section
- Top Rated Cars section
- Customer Testimonials
- CTA buttons and animated sections

## 🔑 Authentication

### Register Page

- Name, Email, photoURL, Password, Google Login
- Redirect to login
- Toast notifications

### Login Page

- Email, Password, Google Login
- Redirect after login
- Toast notifications

### Password Rules

✔ At least 1 uppercase
✔ At least 1 lowercase
✔ Minimum 6 characters

# 🧩 CRUD Functionalities

## ➕ Add Car (Private)

- Fields: Name, Description, Category, Price, Location, Image URL, Provider Name/Email
- Saves to MongoDB with success toast

## 📄 My Listings (Private)

- Provider sees only their cars with Update/Delete actions

## ✏️ Update Car (Private)

- Pre-filled form, updates DB, shows success toast

## ❌ Delete Car (Private)

- SweetAlert confirmation, updates UI & DB

## 📘 My Bookings (Private)

- Shows user's bookings, status, amount, date, car info

## 🔍 Browse Cars (Public)

- All cars, card layout, “View Details” button

## 🚗 Car Details (Private)

- Car info, provider info, booking button, status badge
- Booking updates DB, prevents double booking

# ⚠️ Special Challenges Implemented

- Status updates automatically
- Double booking prevention
- Available / Booked badges
- Search by car name
- Persistent auth on reload

# 🧪 Installation & Setup

## Clone the repos

```
git clone https://github.com/MFRRayhan/rent-wheels-client-file
git clone https://github.com/MFRRayhan/rent-wheels-server-file
```

## Client Setup

```
cd rent-wheels-client-file
npm install
npm run dev
```

.env config for Firebase required

## Server Setup

```
cd rent-wheels-server-file
npm install
node index.js
```

.env config for MongoDB required

# 🧑‍🎨 UI/UX Guidelines Followed

- Unique layout, consistent spacing & typography
- Equal-height car cards
- Clean Navbar & Footer
- Fully responsive grid
- Smooth animations

# 🧑‍💻 Author

**Md. Fazle Rabbi Rayhan**
📧 md.fazlerabbirayhan786@gmail.com
🌐 GitHub: https://github.com/MFRRayhan
🌐 Live Client: https://rent-wheels-9b557.web.app/

# 🎉 Thank You!

If you like this project, consider giving the repository a ⭐ on GitHub!
