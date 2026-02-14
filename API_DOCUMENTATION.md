# LearnHub API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## User Endpoints

### 1. Register User
**POST** `/users/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "type": "student" // "student", "teacher", or "admin"
}
```

**Response:** (201 Created)
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "student"
  }
}
```

---

### 2. Login User
**POST** `/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "student"
  }
}
```

---

### 3. Get User Profile
**GET** `/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
{
  "_id": "64d3e4c5a1b2c3d4e5f6g7h8",
  "name": "John Doe",
  "email": "john@example.com",
  "type": "student",
  "profilePicture": "https://example.com/pic.jpg",
  "bio": "Aspiring developer",
  "enrolledCourses": ["64d3e4c5a1b2c3d4e5f6g7h9"],
  "completedCourses": [],
  "certificates": []
}
```

---

### 4. Update User Profile
**PUT** `/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "bio": "Professional developer",
  "profilePicture": "https://example.com/new-pic.jpg"
}
```

**Response:** (200 OK)
```json
{
  "message": "Profile updated successfully",
  "user": { /* updated user data */ }
}
```

---

## Course Endpoints

### 1. Get All Published Courses
**GET** `/courses`

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by title
- `level` (optional): Filter by level (beginner, intermediate, advanced)

**Example:** `GET /courses?category=web-development&level=beginner`

**Response:** (200 OK)
```json
[
  {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h9",
    "C_title": "Web Development Fundamentals",
    "C_description": "Learn the basics of web development",
    "C_educator": {
      "_id": "64d3e4c5a1b2c3d4e5f6g7h8",
      "name": "John Developer",
      "email": "teacher@example.com"
    },
    "C_categories": "web-development",
    "C_price": 0,
    "C_rating": 4.5,
    "level": "beginner",
    "duration": 20,
    "isPublished": true
  }
]
```

---

### 2. Get Course Details
**GET** `/courses/:id`

**Response:** (200 OK)
```json
{
  "_id": "64d3e4c5a1b2c3d4e5f6g7h9",
  "C_title": "Web Development Fundamentals",
  "C_description": "Learn the basics...",
  "C_educator": { /* educator data */ },
  "C_categories": "web-development",
  "C_price": 0,
  "C_rating": 4.5,
  "thumbnail": "https://example.com/thumb.jpg",
  "sections": [
    {
      "sectionTitle": "Introduction to HTML",
      "sectionDescription": "Learn HTML basics",
      "lessons": [
        {
          "lessonTitle": "HTML Basics",
          "lessonDescription": "Introduction to HTML",
          "videoUrl": "https://example.com/video1",
          "duration": 45
        }
      ]
    }
  ],
  "prerequisites": [],
  "level": "beginner",
  "duration": 20,
  "enrolled": [
    {
      "studentId": "64d3e4c5a1b2c3d4e5f6g7h7",
      "enrollmentDate": "2024-02-06T00:00:00.000Z",
      "progress": 45,
      "isPaid": false,
      "isCompleted": false
    }
  ]
}
```

---

### 3. Create Course (Teacher/Admin)
**POST** `/courses`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "C_title": "Advanced React",
  "C_description": "Master React with hooks and context",
  "C_categories": "web-development",
  "C_price": 49.99,
  "level": "intermediate",
  "duration": 30,
  "prerequisites": ["JavaScript basics"]
}
```

**Response:** (201 Created)
```json
{
  "message": "Course created successfully",
  "course": { /* created course data */ }
}
```

---

### 4. Update Course (Teacher/Admin)
**PUT** `/courses/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "C_title": "Updated Course Title",
  "C_description": "Updated description",
  "C_price": 39.99
}
```

**Response:** (200 OK)
```json
{
  "message": "Course updated successfully",
  "course": { /* updated course data */ }
}
```

---

### 5. Delete Course (Teacher/Admin)
**DELETE** `/courses/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
{
  "message": "Course deleted successfully"
}
```

---

### 6. Add Section to Course (Teacher/Admin)
**POST** `/courses/:id/sections`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sectionTitle": "Advanced Topics",
  "sectionDescription": "Learn advanced concepts",
  "lessons": [
    {
      "lessonTitle": "Performance Optimization",
      "lessonDescription": "Optimize your code",
      "videoUrl": "https://example.com/video",
      "duration": 60
    }
  ]
}
```

**Response:** (201 Created)
```json
{
  "message": "Section added successfully",
  "course": { /* updated course data */ }
}
```

---

### 7. Enroll in Course (Student)
**POST** `/courses/:id/enroll`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
{
  "message": "Enrolled successfully",
  "course": { /* course data */ }
}
```

**Error Response:** (402 Payment Required)
```json
{
  "message": "This is a paid course. Please purchase first."
}
```

---

### 8. Get User's Courses (Protected)
**GET** `/courses/user/mycourses`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
[
  {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h9",
    "C_title": "Web Development Fundamentals",
    /* ... course data ... */
  }
]
```

---

## Admin Endpoints

### 1. Get All Users (Admin)
**GET** `/admin/users`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
[
  {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h8",
    "name": "John Doe",
    "email": "john@example.com",
    "type": "student",
    "enrolledCourses": [],
    "completedCourses": []
  }
]
```

---

### 2. Get All Courses (Admin)
**GET** `/admin/courses`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
[
  {
    "_id": "64d3e4c5a1b2c3d4e5f6g7h9",
    "C_title": "Web Development Fundamentals",
    "C_educator": { /* educator info */ },
    "isPublished": true,
    /* ... course data ... */
  }
]
```

---

### 3. Update User Role (Admin)
**PUT** `/admin/users/:id/role`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "teacher" // "student", "teacher", or "admin"
}
```

**Response:** (200 OK)
```json
{
  "message": "User role updated successfully",
  "user": { /* updated user data */ }
}
```

---

### 4. Delete User (Admin)
**DELETE** `/admin/users/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
{
  "message": "User deleted successfully"
}
```

---

### 5. Publish/Unpublish Course (Admin)
**PUT** `/admin/courses/:id/publish`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "isPublished": true // or false
}
```

**Response:** (200 OK)
```json
{
  "message": "Course publish status updated",
  "course": { /* updated course data */ }
}
```

---

### 6. Get Enrollment Statistics (Admin)
**GET** `/admin/stats/enrollments`

**Headers:** `Authorization: Bearer <token>`

**Response:** (200 OK)
```json
{
  "totalEnrollments": 45,
  "totalCourses": 5,
  "totalUsers": 20,
  "courseDetails": [
    {
      "courseId": "64d3e4c5a1b2c3d4e5f6g7h9",
      "courseTitle": "Web Development Fundamentals",
      "enrollmentCount": 12
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided, authorization denied"
}
```

### 403 Forbidden
```json
{
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication failed |
| 402 | Payment Required - Paid content |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "type": "student"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Courses
```bash
curl -X GET http://localhost:5000/api/courses
```

### Create Course (with token)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "C_title": "New Course",
    "C_description": "Course description",
    "C_categories": "web-development",
    "C_price": 0,
    "level": "beginner",
    "duration": 20
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing:
- API rate limiting (e.g., using `express-rate-limit`)
- Request throttling
- IP-based limiting

---

## Versioning

Current API Version: **v1**

Future versions will be available at `/api/v2`, `/api/v3`, etc.

---

## Changelog

### v1.0.0 (Current)
- Initial API release
- User authentication with JWT
- Course management
- Student enrollment
- Admin dashboard endpoints

---

For additional help or questions, refer to the README.md or QUICKSTART.md files.
