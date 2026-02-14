# LearnHub - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- ✅ Node.js 16+ installed
- ✅ MongoDB running (local or cloud)
- ✅ Code editor (VS Code recommended)

---

## Step 1: Configure Backend Environment

1. Open `backend/.env` and update MongoDB connection:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

---

## Step 2: Start Backend Server

Open Terminal 1 and run:

```bash
cd backend
npm run dev
```

✅ Backend running at: `http://localhost:5000`

---

## Step 3: Start Frontend Application

Open Terminal 2 and run:

```bash
cd frontend
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

---

## 🎯 Testing the Application

### 1. Create Student Account
- Go to `http://localhost:5173`
- Click "Sign Up"
- Fill in: Name, Email, Password
- Select "Student" as user type
- Click Register

### 2. Browse Courses
- Click "Explore Courses" or navigate to `/courses`
- Browse available courses
- Filter by category or level
- Click on any course to view details

### 3. Enroll in Course
- Click "Enroll Now" on any course
- Check your dashboard to see enrolled courses

### 4. View Student Dashboard
- Click "Dashboard" in navigation
- See enrolled and completed courses
- Track progress

---

## 📚 Creating Test Data

### Using Postman or API Client:

#### Register as Teacher
```
POST http://localhost:5000/api/users/register
Body:
{
  "name": "John Doe",
  "email": "teacher@example.com",
  "password": "password123",
  "type": "teacher"
}
```

#### Create a Course (after getting token)
```
POST http://localhost:5000/api/courses
Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body:
{
  "C_title": "Web Development Fundamentals",
  "C_description": "Learn the basics of web development",
  "C_categories": "web-development",
  "C_price": 0,
  "level": "beginner",
  "duration": 20,
  "prerequisites": []
}
```

---

## 🔐 JWT Authentication

All protected endpoints require Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token is automatically saved in localStorage after login and included in all requests.

---

## 📁 Project Structure Quick Reference

```
backend/
  ├── index.js              (Main server file)
  ├── .env                  (Environment variables)
  ├── config/database.js    (DB connection)
  ├── models/
  │   ├── User.js
  │   └── Course.js
  ├── routes/
  │   ├── userRoutes.js
  │   ├── courseRoutes.js
  │   └── adminRoutes.js
  └── middleware/authMiddleware.js

frontend/
  ├── src/
  │   ├── api/apiClient.js          (Axios configuration)
  │   ├── context/AuthContext.jsx   (Auth state management)
  │   ├── pages/
  │   │   ├── Home.jsx
  │   │   ├── Login.jsx
  │   │   ├── CourseListing.jsx
  │   │   └── Dashboard.jsx
  │   └── App.jsx                   (Main app component)
  └── index.html
```

---

## 🔍 Common API Endpoints

### Users
- `POST /api/users/register` - Create account
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get profile (Protected)

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Course details
- `POST /api/courses` - Create course (Teacher)
- `POST /api/courses/:id/enroll` - Enroll in course (Student)

### Admin
- `GET /admin/stats/enrollments` - Platform statistics (Admin)
- `GET /admin/users` - List all users (Admin)

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is running
# Try clearing node_modules and reinstalling
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't load?
```bash
# Check if port 5173 is available
# Or change port in vite.config.ts
cd frontend
rm -rf node_modules
npm install --legacy-peer-deps
npm run dev
```

### CORS errors?
- Ensure backend is running on port 5000
- Check frontend baseURL in `src/api/apiClient.js`
- Verify backend has CORS enabled

### MongoDB connection failed?
```bash
# Start MongoDB (if local)
mongod

# Or update connection string in .env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/learnhub
```

---

## 🎨 Customization

### Change Primary Colors
Edit `frontend/src/App.css`:
```css
:root {
  --primary-color: #667eea;     /* Change this */
  --secondary-color: #764ba2;   /* And this */
}
```

### Add New User Type
1. Update User model in `backend/models/User.js`
2. Add role in `type: enum`
3. Create dashboard component in `frontend/src/pages/Dashboard.jsx`
4. Create routes and middleware

---

## 📚 Next Steps

1. ✅ Set up MongoDB with sample data
2. ✅ Test all user flows (registration, enrollment, etc.)
3. 🔄 Implement payment gateway (Stripe)
4. 🔄 Add video streaming for courses
5. 🔄 Create admin dashboard
6. 🔄 Deploy to production

---

## 🆘 Need Help?

### Check Backend Logs
- Look at terminal where `npm run dev` is running
- Check MongoDB connection status

### Check Frontend Logs
- Open browser DevTools (F12)
- Check Console and Network tabs
- Verify API calls are reaching backend

### Useful Commands

```bash
# Install packages (both)
npm install --legacy-peer-deps

# Clear all caches
npm cache clean --force

# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Start fresh
rm -rf node_modules package-lock.json
npm install
```

---

**You're all set! 🎉 Happy learning!**
