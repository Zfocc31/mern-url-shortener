🚀 MERN URL Shortener with Analytics

A production-ready full-stack URL shortening application built using the MERN stack, featuring click analytics, a responsive UI, and cloud deployment.

🔗 Live Demo
👉 https://mern-url-shortener-steel.vercel.app/

✨ Features

🔗 Convert long URLs into short, shareable links

📊 Track click analytics for each shortened URL

📋 One-click copy to clipboard

🌐 Automatic redirection to original URLs

📱 Responsive and clean UI

⚡ Fast and lightweight

☁️ Cloud deployed with automatic builds and redeployments

🛠 Tech Stack
Frontend

React.js

Axios (API communication)

Framer Motion (animations)

Heroicons (icons)

Vercel (deployment)

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose ODM

ShortID (unique short codes)

Render (deployment)

🧠 Architecture Overview
React (Vercel)
   ↓
Express REST API (Render)
   ↓
MongoDB Atlas


Frontend communicates with backend via REST APIs

Backend handles URL creation, redirection, and analytics

MongoDB Atlas stores URLs and click counts

Automatic redeployment on every GitHub push

📂 Project Structure
mern-url-shortener/
│
├── backend/
│   ├── models/
│   │   └── shortUrl.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
├── .gitignore
└── README.md

🔌 API Endpoints
Endpoint	Method	Description
/shorten	POST	Create a new short URL
/:shortCode	GET	Redirect to the original URL
/api/urls	GET	Fetch all shortened URLs
⚙️ Local Setup
Prerequisites

Node.js (v14+)

MongoDB (Local or Atlas)

Git

1️⃣ Clone the Repository
git clone https://github.com/Zfocc31/mern-url-shortener.git
cd mern-url-shortener

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

MONGODB_URI=your_mongodb_connection_string
PORT=5000


Start backend:

npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start


Open in browser:

http://localhost:3000

☁️ Deployment

Backend deployed on Render

Frontend deployed on Vercel

Automatic rebuild and redeployment on every GitHub push

Environment Variables (Production)

Backend

MONGODB_URI

PORT

Frontend

REACT_APP_API_BASE_URL

🧪 Engineering Highlights

Fixed Express route shadowing issue (/:shortCode vs /api/urls)

Environment-based API configuration for local and production

Implemented click tracking for shortened URLs

Handled long URL overflow in UI using CSS truncation

Clean Git history with original commits

Fully working production deployment

📌 Future Improvements

Custom short URL aliases

User authentication and dashboards

Rate limiting and abuse protection

Analytics charts and insights

QR code generation

👨‍💻 Author

Rahul Sinha
GitHub: https://github.com/Zfocc31
