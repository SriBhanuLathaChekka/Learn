# LearnHub: Your Center for Skill Enhancement

An online learning platform (OLP) that provides tools and resources to facilitate learning and education over the internet. Built with React.js, Express.js, MongoDB, and Vite.

## Features

✅ **User-Friendly Interface** - Intuitive navigation for learners of all technical proficiencies
✅ **Course Management** - Instructors can upload, organize, and manage courses; learners can enroll and track progress
✅ **Interactivity** - Discussion forums, live webinars, and real-time communication
✅ **Certification** - Digital certificates upon course completion
✅ **Accessibility** - Accessible on computers, tablets, and smartphones
✅ **Self-Paced Learning** - Learn at your own pace with flexible scheduling
✅ **Payment System** - Support for free and paid courses with multiple pricing models

## Project Structure

```
LearnHub/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   └── adminRoutes.js
│   ├── index.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── CourseListing.jsx
    │   │   ├── CourseDetail.jsx
    │   │   └── Dashboard.jsx
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── App.jsx
    │   └── App.css
    ├── package.json
    └── vite.config.ts
```

## Technical Architecture

### Frontend
- **Framework**: React 19+ with Vite
- **UI Libraries**: Bootstrap, Material-UI, Ant Design, MDB React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Context API

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enable cross-origin requests
- **Environment Variables**: dotenv

### Database Collections

**Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  type: String (enum: ['student', 'teacher', 'admin']),
  profilePicture: String,
  bio: String,
  enrolledCourses: [ObjectId],
  completedCourses: [ObjectId],
  certificates: [{courseId, certificateUrl, completionDate}],
  createdAt: Date,
  updatedAt: Date
}
```

**Courses Collection**
```javascript
{
  _id: ObjectId,
  C_title: String,
  C_description: String,
  C_educator: ObjectId (ref: User),
  C_categories: String,
  C_price: Number,
  C_rating: Number,
  thumbnail: String,
  sections: [{
    sectionTitle: String,
    sectionDescription: String,
    lessons: [{
      lessonTitle: String,
      lessonDescription: String,
      videoUrl: String,
      materials: [String],
      duration: Number
    }]
  }],
  enrolled: [{
    studentId: ObjectId,
    enrollmentDate: Date,
    progress: Number,
    isPaid: Boolean,
    completionDate: Date,
    isCompleted: Boolean
  }],
  prerequisites: [String],
  level: String (enum: ['beginner', 'intermediate', 'advanced']),
  duration: Number,
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## User Roles and Responsibilities

### Student
- Browse and enroll in courses
- Track learning progress
- Download certificates upon course completion
- Purchase paid courses
- Filter courses by name, category, and level
- Participate in discussion forums

### Teacher
- Create and upload courses
- Add sections and lessons to courses
- Delete courses (only if no students are enrolled)
- Monitor course enrollments
- Track student progress

### Admin
- Manage all users (view, update roles, delete)
- Manage all courses (view, publish/unpublish, delete)
- Monitor platform activity
- View enrollment statistics
- Oversee platform integrity

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
```

4. Start development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start development server:
```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173`

## API Endpoints

### Authentication Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Course Endpoints
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create new course (Teacher/Admin)
- `PUT /api/courses/:id` - Update course (Teacher/Admin)
- `DELETE /api/courses/:id` - Delete course (Teacher/Admin)
- `POST /api/courses/:id/sections` - Add section to course (Teacher/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course (Student)
- `GET /api/courses/user/mycourses` - Get user's courses (Protected)

### Admin Endpoints
- `GET /admin/users` - Get all users (Admin)
- `GET /admin/courses` - Get all courses (Admin)
- `PUT /admin/users/:id/role` - Update user role (Admin)
- `DELETE /admin/users/:id` - Delete user (Admin)
- `PUT /admin/courses/:id/publish` - Publish/unpublish course (Admin)
- `GET /admin/stats/enrollments` - Get enrollment statistics (Admin)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is included in Authorization header for protected routes
5. Backend validates token before granting access

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## Key Features Implementation

### Course Browsing
- Filter by category, level, and search term
- View course details including sections and lessons
- See instructor information
- Display student enrollment count

### Enrollment System
- Free courses: Direct enrollment
- Paid courses: Integration ready for payment gateway
- Track enrollment status
- Monitor learning progress

### Dashboard
- **Student**: View enrolled courses, completed courses, download certificates
- **Teacher**: View created courses, monitor enrollments
- **Admin**: View platform statistics, manage users and courses

### Progress Tracking
- Store progress percentage for each enrollment
- Calculate based on lessons completed
- Display on dashboard

### Certification
- Generate certificates upon course completion
- Download digital certificates
- Track certificate data

## Technologies Used

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 19 |
| Build Tool | Vite |
| UI Library | Bootstrap 5 + Material-UI |
| HTTP Client | Axios |
| Backend | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT + bcryptjs |
| State Management | React Context API |

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check cloud connection string
- Update MONGODB_URI in .env file

### CORS Errors
- Backend is configured with CORS enabled
- Check if frontend URL matches backend CORS settings

### Port Already in Use
- Backend default: 5000, Frontend default: 5173
- Change in .env (backend) or vite.config.ts (frontend)

### Dependency Issues
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install --legacy-peer-deps`

## Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Video hosting and streaming
- [ ] Advanced progress analytics
- [ ] Notification system
- [ ] Quiz and assessment system
- [ ] Discussion forums with comments
- [ ] Live webinar integration
- [ ] Mobile app (React Native)
- [ ] Advanced search and recommendations
- [ ] Instructor analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@learnhub.com or open an issue on GitHub.

---

**Happy Learning! 🎓**
