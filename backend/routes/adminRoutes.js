const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/users', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all courses (Admin only)
router.get('/courses', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    const courses = await Course.find().populate('C_educator', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user role (Admin only)
router.put('/users/:id/role', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    const { type } = req.body;

    if (!['student', 'teacher', 'admin'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { type },
      { new: true }
    ).select('-password');

    res.json({
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Publish/Unpublish course (Admin only)
router.put('/courses/:id/publish', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    const { isPublished } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    res.json({
      message: 'Course publish status updated',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get enrollment statistics (Admin only)
router.get('/stats/enrollments', authMiddleware, authorize(['admin']), async (req, res) => {
  try {
    const courses = await Course.find();
    const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolled.length, 0);
    const totalCourses = courses.length;
    const totalUsers = await User.countDocuments();

    res.json({
      totalEnrollments,
      totalCourses,
      totalUsers,
      courseDetails: courses.map((c) => ({
        courseId: c._id,
        courseTitle: c.C_title,
        enrollmentCount: c.enrolled.length,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
