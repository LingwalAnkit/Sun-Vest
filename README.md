# Solar Community Investment Platform

A web-based platform enabling communities to invest in shared solar energy projects, track energy savings, and monitor environmental impact.

## 🌟 Features

- User authentication and account management
- Solar project investment opportunities
- Real-time energy production monitoring
- Individual contribution tracking
- Environmental impact visualization
- Community progress dashboard
- Interactive data visualization using Recharts
- Responsive design for all devices

## 🔧 Technology Stack

### Frontend
- React 18.3.1
- Vite
- Redux Toolkit for state management
- TailwindCSS for styling
- GSAP for animations
- Recharts for data visualization
- Ant Design component library

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time updates
- JWT for authentication
- Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd solar-community-platform
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd server
npm install
npm start
```

## ⚙️ Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🏗️ Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
```

## 📦 Dependencies

### Frontend Dependencies
- @gsap/react, gsap: Animation library
- @reduxjs/toolkit, redux: State management
- antd: UI components
- axios: HTTP client
- react-router-dom: Routing
- recharts: Data visualization
- tailwindcss: Styling

### Backend Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: Authentication
- bcrypt: Password hashing
- socket.io: Real-time updates
- cors: Cross-origin resource sharing

## 🔑 API Endpoints

```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
GET    /api/projects         # Get solar projects
POST   /api/investments      # Make investment
GET    /api/dashboard        # User dashboard data
```

## 🛠️ Development

```bash
# Run frontend in development mode
cd client
npm run dev

# Run backend in development mode
cd server
node index.js
```


## 🚀 Deployment

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy the backend:
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Ankit Lingwal
Priyanshu Raj
Satyam Chetri

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspiration
- etc
