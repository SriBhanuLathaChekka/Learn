const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

// Get all published courses (for students)
router.get('/', async (req, res) => {
  try {
    const { category, search, level } = req.query;
    let filter = { isPublished: true };

    if (category) filter.C_categories = category;
    if (search) filter.C_title = { $regex: search, $options: 'i' };
    if (level) filter.level = level;

    const courses = await Course.find(filter)
      .populate('C_educator', 'name email')
      .select('-enrolled');

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course details
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('C_educator', 'name email bio');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create course (Teachers only)
router.post('/', authMiddleware, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const { C_title, C_description, C_categories, C_price, level, duration, prerequisites } = req.body;

    const course = new Course({
      C_title,
      C_description,
      C_educator: req.user.userId,
      C_categories,
      C_price: C_price || 0,
      level: level || 'beginner',
      duration,
      prerequisites: prerequisites || [],
    });

    await course.save();
    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course (Teachers only)
router.put('/:id', authMiddleware, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.C_educator.toString() !== req.user.userId && req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updates = req.body;
    Object.assign(course, updates);
    await course.save();

    res.json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete course (Teachers only)
router.delete('/:id', authMiddleware, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.C_educator.toString() !== req.user.userId && req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    if (course.enrolled.length > 0) {
      return res.status(400).json({ message: 'Cannot delete course with enrolled students' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add section to course
router.post('/:id/sections', authMiddleware, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.C_educator.toString() !== req.user.userId && req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { sectionTitle, sectionDescription, lessons } = req.body;
    course.sections.push({
      sectionTitle,
      sectionDescription,
      lessons: lessons || [],
    });

    await course.save();
    res.status(201).json({
      message: 'Section added successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll in course (Students only)
router.post('/:id/enroll', authMiddleware, authorize(['student']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (course.enrolled.some((e) => e.studentId.toString() === req.user.userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Check if it's a paid course
    if (course.C_price > 0) {
      return res.status(402).json({ message: 'This is a paid course. Please purchase first.' });
    }

    course.enrolled.push({
      studentId: req.user.userId,
      enrollmentDate: new Date(),
      isPaid: false,
    });

    await course.save();

    // Add to user's enrolled courses
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { enrolledCourses: req.params.id } },
      { new: true }
    );

    res.json({
      message: 'Enrolled successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's courses
router.get('/user/mycourses', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ 'enrolled.studentId': req.user.userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
