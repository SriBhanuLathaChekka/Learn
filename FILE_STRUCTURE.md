# LearnHub Project File Structure Guide

## 📂 Complete Directory Tree

```
LearnHub/
│
├── 📄 README.md                      (Main project documentation)
├── 📄 QUICKSTART.md                  (5-minute setup guide)
├── 📄 API_DOCUMENTATION.md           (Complete API reference)
├── 📄 DEPLOYMENT.md                  (Production deployment guide)
├── 📄 IMPLEMENTATION_SUMMARY.md       (What was implemented)
├── 📄 DEVELOPER_CHECKLIST.md          (Development checklist)
├── 📄 FILE_STRUCTURE.md              (This file)
│
├── 📁 backend/                       (Express.js API Server)
│   │
│   ├── 📁 config/
│   │   └── database.js               (MongoDB connection setup)
│   │
│   ├── 📁 models/
│   │   ├── User.js                   (User schema & auth)
│   │   │   ├── Name
│   │   │   ├── Email (unique)
│   │   │   ├── Password (hashed)
│   │   │   ├── Type (student/teacher/admin)
│   │   │   ├── Enrolled Courses
│   │   │   └── Certificates
│   │   │
│   │   └── Course.js                 (Course schema)
│   │       ├── Title
│   │       ├── Description
│   │       ├── Educator (teacher)
│   │       ├── Category
│   │       ├── Price
│   │       ├── Sections & Lessons
│   │       ├── Enrollments
│   │       └── Rating
│   │
│   ├── 📁 routes/
│   │   ├── userRoutes.js             (Auth & user endpoints)
│   │   │   ├── POST /register
│   │   │   ├── POST /login
│   │   │   ├── GET /profile
│   │   │   └── PUT /profile
│   │   │
│   │   ├── courseRoutes.js           (Course management)
│   │   │   ├── GET /courses
│   │   │   ├── GET /courses/:id
│   │   │   ├── POST /courses
│   │   │   ├── PUT /courses/:id
│   │   │   ├── DELETE /courses/:id
│   │   │   ├── POST /sections
│   │   │   └── POST /enroll
│   │   │
│   │   └── adminRoutes.js            (Admin functions)
│   │       ├── GET /users
│   │       ├── GET /courses
│   │       ├── PUT /users/:id/role
│   │       ├── DELETE /users/:id
│   │       ├── PUT /courses/:id/publish
│   │       └── GET /stats/enrollments
│   │
│   ├── 📁 middleware/
│   │   └── authMiddleware.js         (JWT & role-based auth)
│   │       ├── authMiddleware()
│   │       └── authorize(roles)
│   │
│   ├── 📄 index.js                   (Main server file)
│   │   ├── Express setup
│   │   ├── Middleware config
│   │   ├── Route registration
│   │   └── Error handling
│   │
│   ├── 📄 seed.js                    (Database seeding)
│   │   └── Creates sample users, courses, enrollments
│   │
│   ├── 📄 .env                       (Environment variables)
│   │   ├── PORT
│   │   ├── MONGODB_URI
│   │   ├── JWT_SECRET
│   │   └── NODE_ENV
│   │
│   ├── 📄 package.json               (npm dependencies)
│   │   ├── express
│   │   ├── mongoose
│   │   ├── bcryptjs
│   │   ├── jsonwebtoken
│   │   ├── cors
│   │   ├── dotenv
│   │   └── nodemon (dev)
│   │
│   ├── 📄 package-lock.json
│   └── 📁 node_modules/              (Dependencies)
│
├── 📁 frontend/                      (React + Vite App)
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── 📁 api/
│   │   │   └── apiClient.js          (Axios configuration)
│   │   │       ├── API base URL
│   │   │       ├── Request interceptors
│   │   │       ├── authAPI methods
│   │   │       ├── courseAPI methods
│   │   │       └── adminAPI methods
│   │   │
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx       (Auth state management)
│   │   │       ├── useAuth hook
│   │   │       ├── User state
│   │   │       ├── Token management
│   │   │       └── Login/Logout logic
│   │   │
│   │   ├── 📁 pages/                 (Page components)
│   │   │   │
│   │   │   ├── Home.jsx              (Landing page)
│   │   │   │   ├── Hero section
│   │   │   │   ├── Features showcase
│   │   │   │   └── CTA buttons
│   │   │   │
│   │   │   ├── Login.jsx             (Login page)
│   │   │   │   ├── Email field
│   │   │   │   ├── Password field
│   │   │   │   ├── Form validation
│   │   │   │   └── Error handling
│   │   │   │
│   │   │   ├── Register.jsx          (Registration page)
│   │   │   │   ├── Name field
│   │   │   │   ├── Email field
│   │   │   │   ├── Password field
│   │   │   │   ├── User type selection
│   │   │   │   └── Form validation
│   │   │   │
│   │   │   ├── CourseListing.jsx     (Browse courses)
│   │   │   │   ├── Course cards
│   │   │   │   ├── Search functionality
│   │   │   │   ├── Category filter
│   │   │   │   ├── Level filter
│   │   │   │   └── Enroll buttons
│   │   │   │
│   │   │   ├── CourseDetail.jsx      (Course details)
│   │   │   │   ├── Course info
│   │   │   │   ├── Curriculum view
│   │   │   │   ├── Instructor info
│   │   │   │   ├── Prerequisites
│   │   │   │   └── Enrollment button
│   │   │   │
│   │   │   ├── Dashboard.jsx         (User dashboards)
│   │   │   │   ├── StudentDashboard
│   │   │   │   │   ├── Enrolled courses
│   │   │   │   │   ├── Completed courses
│   │   │   │   │   └── Progress tracking
│   │   │   │   ├── TeacherDashboard
│   │   │   │   │   ├── Course stats
│   │   │   │   │   └── Student tracking
│   │   │   │   └── AdminDashboard
│   │   │   │       └── Platform stats
│   │   │   │
│   │   │   ├── Auth.css               (Auth pages styling)
│   │   │   ├── CourseListing.css      (Course listing styling)
│   │   │   ├── CourseDetail.css       (Course detail styling)
│   │   │   ├── Dashboard.css          (Dashboard styling)
│   │   │   └── Home.css               (Home page styling)
│   │   │
│   │   ├── 📁 components/            (Reusable components)
│   │   │   │
│   │   │   ├── Navigation.jsx        (App navbar)
│   │   │   │   ├── Logo/brand
│   │   │   │   ├── Navigation links
│   │   │   │   ├── User menu
│   │   │   │   └── Login/Logout buttons
│   │   │   │
│   │   │   ├── Footer.jsx            (App footer)
│   │   │   │   ├── Company info
│   │   │   │   ├── Quick links
│   │   │   │   └── Social media
│   │   │   │
│   │   │   ├── ProtectedRoute.jsx    (Route protection)
│   │   │   │   ├── Auth check
│   │   │   │   ├── Role-based access
│   │   │   │   └── Redirect logic
│   │   │   │
│   │   │   ├── Navigation.css        (Navbar styling)
│   │   │   └── Footer.css            (Footer styling)
│   │   │
│   │   ├── App.jsx                   (Main app component)
│   │   │   ├── Route setup
│   │   │   ├── Auth provider
│   │   │   └── Layout structure
│   │   │
│   │   ├── App.css                   (Global styles)
│   │   │   ├── Color variables
│   │   │   ├── Global styles
│   │   │   ├── Button styles
│   │   │   └── Utility classes
│   │   │
│   │   ├── main.tsx                  (Entry point)
│   │   ├── index.css                 (Base styles)
│   │   │
│   │   └── 📁 assets/                (Images, fonts, etc.)
│   │       └── (Empty initially)
│   │
│   ├── 📄 index.html                 (HTML template)
│   │   └── Root div for React mount
│   │
│   ├── 📄 vite.config.ts             (Vite configuration)
│   │   ├── React plugin
│   │   ├── Server config
│   │   └── Build settings
│   │
│   ├── 📄 package.json               (npm dependencies)
│   │   ├── react
│   │   ├── react-router-dom
│   │   ├── axios
│   │   ├── bootstrap
│   │   ├── react-bootstrap
│   │   ├── @mui/material
│   │   ├── antd
│   │   └── other dependencies
│   │
│   ├── 📄 package-lock.json
│   ├── 📄 tsconfig.json              (TypeScript config)
│   ├── 📄 eslint.config.js           (ESLint config)
│   ├── 📄 .gitignore
│   ├── 📄 README.md
│   │
│   └── 📁 node_modules/              (Dependencies)
│
└── 📁 [Other standard git files]
    ├── .gitignore
    ├── .git/                         (Git history)
    └── .gitattributes
```

---

## 📋 File Descriptions

### Backend Files

#### Core Server
| File | Purpose |
|------|---------|
| `index.js` | Express server setup, middleware config, route registration |
| `config/database.js` | MongoDB connection and initialization |
| `seed.js` | Database seeding with sample data |
| `.env` | Environment variables (PORT, DB URI, JWT_SECRET) |

#### Models
| File | Purpose |
|------|---------|
| `models/User.js` | User schema with authentication methods |
| `models/Course.js` | Course schema with sections and enrollments |

#### Routes
| File | Purpose |
|------|---------|
| `routes/userRoutes.js` | User auth and profile endpoints |
| `routes/courseRoutes.js` | Course CRUD and enrollment endpoints |
| `routes/adminRoutes.js` | Admin management endpoints |

#### Middleware
| File | Purpose |
|------|---------|
| `middleware/authMiddleware.js` | JWT validation and role authorization |

### Frontend Files

#### Configuration
| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build tool configuration |
| `package.json` | Dependencies and scripts |
| `index.html` | HTML template for React mount |

#### Core App
| File | Purpose |
|------|---------|
| `App.jsx` | Main app component with routing |
| `main.tsx` | React app entry point |

#### API & State
| File | Purpose |
|------|---------|
| `api/apiClient.js` | Axios instance and API methods |
| `context/AuthContext.jsx` | Global authentication state |

#### Pages (Full Features)
| File | Purpose |
|------|---------|
| `pages/Home.jsx` | Landing page with hero and features |
| `pages/Login.jsx` | User login page |
| `pages/Register.jsx` | User registration with role selection |
| `pages/CourseListing.jsx` | Browse and filter courses |
| `pages/CourseDetail.jsx` | View course details and enroll |
| `pages/Dashboard.jsx` | Role-based dashboards (Student/Teacher/Admin) |

#### Components (Reusable)
| File | Purpose |
|------|---------|
| `components/Navigation.jsx` | App navigation bar |
| `components/Footer.jsx` | App footer |
| `components/ProtectedRoute.jsx` | Protected route wrapper |

#### Styling
| File | Purpose |
|------|---------|
| `App.css` | Global styles and theme variables |
| `pages/*.css` | Page-specific styles |
| `components/*.css` | Component-specific styles |

---

## 🔄 Data Flow

### User Registration Flow
```
Frontend Form
    ↓
Register Page (pages/Register.jsx)
    ↓
API Call (apiClient.js → POST /register)
    ↓
Backend Router (userRoutes.js)
    ↓
User Model (models/User.js)
    ↓
MongoDB (Store user)
    ↓
JWT Token Generated
    ↓
Response with Token
    ↓
Auth Context Updated
    ↓
Redirect to Dashboard
```

### Course Enrollment Flow
```
Course Listing Page
    ↓
Click "Enroll Now"
    ↓
API Call (courseAPI.enrollCourse)
    ↓
Backend Route (courseRoutes.js)
    ↓
Course Model Updated
    ↓
User Model Updated
    ↓
Success Response
    ↓
Dashboard Shows New Course
```

---

## 📊 Component Hierarchy

```
App (App.jsx)
├── Navigation (components/Navigation.jsx)
├── Routes
│   ├── Home (pages/Home.jsx)
│   ├── Login (pages/Login.jsx)
│   ├── Register (pages/Register.jsx)
│   ├── CourseListing (pages/CourseListing.jsx)
│   ├── CourseDetail (pages/CourseDetail.jsx)
│   └── Dashboard (pages/Dashboard.jsx)
│       ├── StudentDashboard
│       ├── TeacherDashboard
│       └── AdminDashboard
└── Footer (components/Footer.jsx)
```

---

## 🔐 API Endpoint Organization

### User Endpoints (userRoutes.js)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get profile (Protected)
- `PUT /profile` - Update profile (Protected)

### Course Endpoints (courseRoutes.js)
- `GET /courses` - List courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create (Teacher/Admin)
- `PUT /courses/:id` - Update (Teacher/Admin)
- `DELETE /courses/:id` - Delete (Teacher/Admin)
- `POST /sections` - Add section (Teacher/Admin)
- `POST /enroll` - Enroll in course (Student)

### Admin Endpoints (adminRoutes.js)
- `GET /users` - List all users (Admin)
- `GET /courses` - List all courses (Admin)
- `PUT /users/:id/role` - Update role (Admin)
- `DELETE /users/:id` - Delete user (Admin)
- `PUT /courses/:id/publish` - Publish course (Admin)
- `GET /stats/enrollments` - Get statistics (Admin)

---

## 📦 Dependencies by Category

### Frontend
- **UI Framework**: react, react-dom
- **Routing**: react-router-dom
- **HTTP**: axios
- **UI Components**: bootstrap, react-bootstrap, @mui/material, antd
- **Build**: vite

### Backend
- **Framework**: express
- **Database**: mongoose
- **Authentication**: bcryptjs, jsonwebtoken
- **Utilities**: cors, dotenv
- **Development**: nodemon

---

## 🗂️ Adding New Features

### To Add a New Page
1. Create file in `frontend/src/pages/NewPage.jsx`
2. Create styles in `frontend/src/pages/NewPage.css`
3. Add route in `App.jsx`
4. Update Navigation.jsx if needed

### To Add a New API Endpoint
1. Create/update route in `backend/routes/`
2. Create API method in `frontend/src/api/apiClient.js`
3. Create page component to use the endpoint
4. Test with Postman

### To Add a New Database Field
1. Update model in `backend/models/`
2. Add validation if needed
3. Update routes that use this field
4. Update frontend form/display

---

## 📝 File Naming Conventions

- **Pages**: PascalCase + ".jsx" (e.g., `CourseListing.jsx`)
- **Components**: PascalCase + ".jsx" (e.g., `Navigation.jsx`)
- **Utilities**: camelCase + ".js" (e.g., `apiClient.js`)
- **Styles**: Match component name + ".css"
- **Models**: PascalCase + ".js" (e.g., `User.js`)
- **Routes**: camelCase + ".js" (e.g., `userRoutes.js`)

---

## 🎯 Quick File Lookups

**Need to modify authentication?**
- Backend: `backend/models/User.js`, `backend/middleware/authMiddleware.js`
- Frontend: `frontend/src/context/AuthContext.jsx`

**Need to add a course field?**
- Backend: `backend/models/Course.js`, `backend/routes/courseRoutes.js`
- Frontend: `frontend/src/pages/CourseListing.jsx`, `Dashboard.jsx`

**Need to change styling?**
- Global: `frontend/src/App.css`
- Pages: `frontend/src/pages/*.css`
- Components: `frontend/src/components/*.css`

**Need to add an admin feature?**
- Backend: `backend/routes/adminRoutes.js`
- Frontend: `frontend/src/pages/Dashboard.jsx` (AdminDashboard)

---

**Happy developing! 🚀**
