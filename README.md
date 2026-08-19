# 🏡 EstateKart

Welcome to **EstateKart**, a premium real estate and rental property management platform. Whether you are a tenant looking for your next home or a landlord looking to list your properties, EstateKart provides a seamless, modern, and AI-assisted experience.

---

## ✨ Features

- **🔐 Google OAuth Authentication**: Quick and secure login using NextAuth with Google integration.
- **🤖 EK.ai Chatbot Assistant**: An interactive AI assistant powered by Gemini (`gemini-3.5-flash`) to guide users with property search, rates, and platform guidance.
- **🗺️ Interactive Map Geolocation**: Real-time property map pinning using Leaflet and Google Maps API.
- **✉️ Direct Landlord Inquiries**: Internal user-to-user messaging system allowing renters to contact sellers directly.
- **⭐ Saved Properties (Bookmarks)**: Users can bookmark and manage their favorite listings.
- **📸 Cloudinary Image Hosting**: Seamless property multi-image upload and management.
- **📱 Fully Responsive Design**: Sleek layout crafted with custom CSS and Tailwind CSS, optimized for mobile, tablet, and desktop views.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend library**: [React 19](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) ORM
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **AI Integrations**: [Google GenAI SDK](https://github.com/google-gemini/generative-ai-js)
- **Maps**: [Leaflet Maps](https://leafletjs.org/) & Google Maps API
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Media Storage**: [Cloudinary](https://cloudinary.com/)

---

## 🚀 How EstateKart Works

Here is a quick overview of how users interact with the application:

### 1. Searching and Exploring
- Visitors land on the homepage and can search for properties by location or property type.
- Pagination supports smooth navigation across multiple listings.
- Each listing page displays comprehensive descriptions, property details (beds, baths, square feet), nightly/weekly/monthly rates, and dynamic contact forms.

### 2. User Accounts & Bookmarks
- Logged-in users can bookmark property cards.
- Saved properties are persisted to their profile and can be viewed or removed at any time under the **Saved Properties** section.

### 3. Listing & Managing Properties (For Landlords)
- Registered users can create, edit, or delete listings via the **Add Property** page.
- Landlords can specify coordinates (latitude and longitude) to pin their property location accurately on the map.
- Uploaded images are hosted on Cloudinary, providing optimized loading and performance.

### 4. Interactive Messaging
- Renters can submit an inquiry through the contact form on any listing page.
- Landlords receive these inquiries in their personal **Messages** inbox, displaying the sender's details, phone, email, and property reference.

### 5. Chatting with EK.ai (AI Helper)
- A floating chatbot is available on the bottom-right corner of the site.
- Driven by Gemini API, it provides smart real estate advice and responds to inquiries about EstateKart listings.
- Includes user prompt editing, copying messages, and clear history features.

---

## ⚙️ Getting Started & Local Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and a running [MongoDB](https://www.mongodb.com/) database.

### 1. Clone & Install Dependencies
Navigate to the root directory and install dependencies:
```bash
npm install
```

### 2. Setup Environment Variables
Create a file named `.env` in the root directory and configure the following variables:

```env
# Domain Settings
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api

# Database Connection
MONGODB_URI=your_mongodb_connection_string

# Google OAuth Credentials (for NextAuth login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth Configurations
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_jwt_secret

# Cloudinary Credentials (for property images upload)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Map and Geocoding APIs
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=your_google_geocoding_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Google Gemini AI Credentials
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience EstateKart!

### 4. Build for Production
To generate an optimized production build, run:
```bash
npm run build
npm start
```
