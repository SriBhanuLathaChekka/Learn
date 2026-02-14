# LearnHub Developer Setup Checklist

Complete this checklist to verify your LearnHub development environment is ready.

## ✅ Prerequisites

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running (local or connection string ready)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Postman or API client installed (optional, for testing)

---

## ✅ Project Structure Verification

### Backend Structure
- [ ] `backend/` folder exists
- [ ] `backend/package.json` exists
- [ ] `backend/.env` file created and configured
- [ ] `backend/index.js` main server file
- [ ] `backend/config/database.js` MongoDB connection
- [ ] `backend/models/User.js` user schema
- [ ] `backend/models/Course.js` course schema
- [ ] `backend/routes/userRoutes.js` user endpoints
- [ ] `backend/routes/courseRoutes.js` course endpoints
- [ ] `backend/routes/adminRoutes.js` admin endpoints
- [ ] `backend/middleware/authMiddleware.js` JWT auth
- [ ] `backend/seed.js` database seeder

### Frontend Structure
- [ ] `frontend/` folder exists
- [ ] `frontend/package.json` exists
- [ ] `frontend/src/` folder exists
- [ ] `frontend/src/api/apiClient.js` Axios config
- [ ] `frontend/src/context/AuthContext.jsx` auth state
- [ ] `frontend/src/pages/` folder with all pages
- [ ] `frontend/src/components/` folder with components
- [ ] `frontend/src/App.jsx` main app component
- [ ] `frontend/vite.config.ts` Vite configuration

### Documentation
- [ ] `README.md` project documentation
- [ ] `QUICKSTART.md` quick setup guide
- [ ] `API_DOCUMENTATION.md` API reference
- [ ] `DEPLOYMENT.md` deployment guide
- [ ] `IMPLEMENTATION_SUMMARY.md` implementation summary

---

## ✅ Environment Configuration

### Backend .env File
```bash
cd backend
cat .env
```

Verify these variables are set:
- [ ] `PORT=5000`
- [ ] `MONGODB_URI=mongodb://localhost:27017/learnhub` (or your connection string)
- [ ] `JWT_SECRET=your_secret_key`
- [ ] `NODE_ENV=development`

### Frontend API Configuration
```bash
cd frontend
grep -r "API_BASE_URL" src/
```

Verify:
- [ ] API base URL points to backend (`http://localhost:5000/api`)
- [ ] CORS headers configured

---

## ✅ Dependencies Installation

### Backend Dependencies
```bash
cd backend
npm list
```

Verify these packages are installed:
- [ ] express
- [ ] cors
- [ ] mongoose
- [ ] bcryptjs
- [ ] jsonwebtoken
- [ ] dotenv
- [ ] nodemon

### Frontend Dependencies
```bash
cd frontend
npm list
```

Verify these packages are installed:
- [ ] react
- [ ] react-dom
- [ ] react-router-dom
- [ ] axios
- [ ] bootstrap
- [ ] react-bootstrap
- [ ] @mui/material
- [ ] antd

---

## ✅ Startup Procedures

### Terminal 1 - MongoDB
```bash
# Windows
mongod

# Mac/Linux
mongod

# Or if using MongoDB Atlas, skip this
```
- [ ] MongoDB is running (should see "listening on port 27017")

### Terminal 2 - Backend
```bash
cd backend
npm run dev
```
- [ ] Backend starts successfully
- [ ] No errors in console
- [ ] Message shows "Server running on port 5000"

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```
- [ ] Frontend starts successfully
- [ ] No errors in console
- [ ] Message shows development server URL (http://localhost:5173)

---

## ✅ Functionality Testing

### Home Page
- [ ] Visit http://localhost:5173
- [ ] Page loads without errors
- [ ] Navigation bar displays correctly
- [ ] "Explore Courses" button works
- [ ] "Get Started" button works

### Registration
- [ ] Click "Sign Up" or navigate to `/register`
- [ ] Registration form displays
- [ ] Can fill in: Name, Email, Password
- [ ] Can select user type (Student/Teacher)
- [ ] Submit button creates account
- [ ] Redirects to dashboard after registration
- [ ] JWT token saved in localStorage

### Login
- [ ] Navigate to `/login`
- [ ] Can enter email and password
- [ ] Submit button logs in
- [ ] Redirects to dashboard
- [ ] User info displays in navbar

### Course Listing
- [ ] Navigate to `/courses`
- [ ] Courses display properly
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Level filter works
- [ ] Course cards are responsive

### Dashboard
- [ ] Dashboard loads after login
- [ ] Displays enrolled courses (if any)
- [ ] Shows completed courses section
- [ ] Progress tracking displays
- [ ] Responsive on mobile

---

## ✅ API Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "type": "student"
  }'
```
- [ ] Returns 201 status
- [ ] Includes JWT token in response
- [ ] User data returned

### Test Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
- [ ] Returns 200 status
- [ ] JWT token provided
- [ ] User object returned

### Test Get Courses
```bash
curl http://localhost:5000/api/courses
```
- [ ] Returns 200 status
- [ ] Array of courses returned
- [ ] Course objects have required fields

### Test Protected Route
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```
- [ ] Returns 200 status with token
- [ ] Returns 401 without token

---

## ✅ Database Seeding

### Seed Sample Data
```bash
cd backend
npm run seed
```
- [ ] Script runs successfully
- [ ] Database populated with test data
- [ ] No errors in console
- [ ] Test credentials displayed

### Verify Seeded Data
```bash
# In MongoDB shell or Atlas UI
use learnhub
db.users.find().count()  // Should be > 0
db.courses.find().count()  // Should be > 0
```
- [ ] Users collection has documents
- [ ] Courses collection has documents
- [ ] Sample teacher and students exist

---

## ✅ Browser DevTools

### Console
- [ ] No JavaScript errors
- [ ] No warnings related to React or dependencies
- [ ] API calls logging correctly

### Network Tab
- [ ] API calls to `localhost:5000` succeeding
- [ ] Status codes 200/201 for successful requests
- [ ] No CORS errors
- [ ] Token in Authorization headers

### Application Tab
- [ ] JWT token stored in localStorage
- [ ] Token key: `authToken`
- [ ] Token value is valid JWT format

---

## ✅ Common Issues & Fixes

### Port 5000 Already in Use
- [ ] Change `PORT` in `.env`
- [ ] Kill process: `lsof -i :5000` / `taskkill /PID <pid> /F`

### MongoDB Connection Failed
- [ ] Verify MongoDB is running
- [ ] Check connection string in `.env`
- [ ] Verify IP whitelist (if MongoDB Atlas)

### CORS Errors
- [ ] Verify backend has CORS enabled
- [ ] Check frontend API URL matches backend
- [ ] Verify `Access-Control-Allow-Origin` headers

### Dependencies Installation Issues
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete node_modules: `rm -rf node_modules`
- [ ] Reinstall: `npm install --legacy-peer-deps`

### Build Errors
- [ ] Check for syntax errors in files
- [ ] Verify all imports are correct
- [ ] Run linter: `npm run lint` (if configured)

---

## ✅ Development Workflow

### Making Changes
- [ ] Create feature branch: `git checkout -b feature/feature-name`
- [ ] Make changes to code
- [ ] Test changes locally
- [ ] Verify no console errors
- [ ] Commit changes: `git commit -m "Add feature"`

### Backend Changes
- [ ] Stop server: `Ctrl+C`
- [ ] Make changes
- [ ] Restart with `npm run dev`
- [ ] Test endpoints with API client

### Frontend Changes
- [ ] Changes hot-reload automatically
- [ ] Check browser for errors
- [ ] Clear cache if needed: `Ctrl+Shift+R`

---

## ✅ Performance Checks

### Frontend Performance
- [ ] Page loads in < 3 seconds
- [ ] No unnecessary re-renders
- [ ] Smooth scrolling and interactions
- [ ] Images load quickly
- [ ] Responsive on mobile devices

### Backend Performance
- [ ] API responses < 200ms
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Memory usage stable

---

## ✅ Security Checklist

- [ ] Passwords are hashed (bcryptjs)
- [ ] JWT tokens properly validated
- [ ] Protected routes require authentication
- [ ] CORS properly configured
- [ ] No sensitive data in logs
- [ ] Input validation on all endpoints
- [ ] Passwords never returned in API
- [ ] Admin endpoints properly guarded

---

## ✅ Documentation Review

- [ ] Read README.md for project overview
- [ ] Review QUICKSTART.md for setup
- [ ] Check API_DOCUMENTATION.md for endpoints
- [ ] Understand DEPLOYMENT.md for production

---

## ✅ Before Committing Code

- [ ] No console.log() debugging statements
- [ ] No commented-out code
- [ ] Proper error handling
- [ ] Code follows project style
- [ ] No unused imports
- [ ] Functions are documented
- [ ] Tests pass (if applicable)

---

## ✅ Production Readiness

### Before Deploying
- [ ] Update .env with production values
- [ ] Build frontend: `npm run build`
- [ ] Test build locally
- [ ] Verify all API endpoints work
- [ ] Database backups configured
- [ ] HTTPS enabled
- [ ] Error monitoring setup
- [ ] Rate limiting configured

---

## ✅ Team Collaboration

### For Team Members
- [ ] Clone repository: `git clone <repo>`
- [ ] Install dependencies
- [ ] Configure .env from template
- [ ] Start development servers
- [ ] Create feature branch
- [ ] Make changes
- [ ] Push to remote
- [ ] Create pull request
- [ ] Request review
- [ ] Merge when approved

---

## 📞 Getting Help

If stuck on any checklist item:

1. **Check Documentation**
   - README.md - General info
   - QUICKSTART.md - Setup help
   - API_DOCUMENTATION.md - API issues

2. **Review Code**
   - Check similar implementations
   - Look at working examples
   - Review error messages

3. **Debug**
   - Check browser console
   - Review server logs
   - Use Network tab in DevTools
   - Test with Postman

4. **Resources**
   - React docs: reactjs.org
   - Express docs: expressjs.com
   - MongoDB docs: mongodb.com/docs
   - Vite docs: vitejs.dev

---

## 🎉 Checklist Complete!

When all items are checked:
- ✅ Your development environment is ready
- ✅ You can start developing features
- ✅ You understand the project structure
- ✅ You can run and test the application
- ✅ You're ready to contribute to LearnHub

**Happy Coding! 🚀**

---

**Last Updated:** February 2026
**Version:** 1.0.0
