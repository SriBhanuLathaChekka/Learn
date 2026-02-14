const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Course = require('./models/Course');
const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const teacher = await User.create({
      name: 'John Developer',
      email: 'teacher@example.com',
      password: 'password123',
      type: 'teacher',
      bio: 'Experienced web developer with 10+ years in the industry',
    });

    const student1 = await User.create({
      name: 'Sarah Smith',
      email: 'student1@example.com',
      password: 'password123',
      type: 'student',
      bio: 'Aspiring web developer',
    });

    const student2 = await User.create({
      name: 'Mike Johnson',
      email: 'student2@example.com',
      password: 'password123',
      type: 'student',
      bio: 'Learning new skills',
    });

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      type: 'admin',
      bio: 'Platform administrator',
    });

    console.log('✅ Users created successfully');

    // Create sample courses
    const courses = await Course.insertMany([
      {
        C_title: 'Web Development Fundamentals',
        C_description: 'Learn the basics of HTML, CSS, and JavaScript. Perfect for beginners who want to start their web development journey.',
        C_educator: teacher._id,
        C_categories: 'web-development',
        C_price: 0,
        C_rating: 4.5,
        level: 'beginner',
        duration: 20,
        isPublished: true,
        prerequisites: [],
        sections: [
          {
            sectionTitle: 'Introduction to HTML',
            sectionDescription: 'Learn HTML basics',
            lessons: [
              {
                lessonTitle: 'HTML Basics',
                lessonDescription: 'Introduction to HTML structure',
                duration: 45,
                videoUrl: 'https://example.com/video1',
              },
              {
                lessonTitle: 'HTML Forms',
                lessonDescription: 'Creating and handling forms',
                duration: 60,
                videoUrl: 'https://example.com/video2',
              },
            ],
          },
          {
            sectionTitle: 'CSS Styling',
            sectionDescription: 'Learn CSS for styling web pages',
            lessons: [
              {
                lessonTitle: 'CSS Selectors',
                lessonDescription: 'Understanding CSS selectors',
                duration: 50,
                videoUrl: 'https://example.com/video3',
              },
            ],
          },
        ],
      },
      {
        C_title: 'Advanced React.js',
        C_description: 'Master React.js with hooks, context API, and state management. Build production-ready applications.',
        C_educator: teacher._id,
        C_categories: 'web-development',
        C_price: 49.99,
        C_rating: 4.8,
        level: 'intermediate',
        duration: 30,
        isPublished: true,
        prerequisites: ['JavaScript basics', 'HTML/CSS knowledge'],
        sections: [
          {
            sectionTitle: 'React Hooks',
            sectionDescription: 'Understanding React Hooks',
            lessons: [
              {
                lessonTitle: 'useState Hook',
                lessonDescription: 'State management with useState',
                duration: 60,
              },
              {
                lessonTitle: 'useEffect Hook',
                lessonDescription: 'Side effects in functional components',
                duration: 75,
              },
            ],
          },
        ],
      },
      {
        C_title: 'Data Science with Python',
        C_description: 'Comprehensive guide to data science using Python. Learn pandas, numpy, and machine learning.',
        C_educator: teacher._id,
        C_categories: 'data-science',
        C_price: 59.99,
        C_rating: 4.7,
        level: 'intermediate',
        duration: 40,
        isPublished: true,
        prerequisites: ['Python basics'],
        sections: [
          {
            sectionTitle: 'Data Manipulation',
            sectionDescription: 'Working with data',
            lessons: [
              {
                lessonTitle: 'Pandas Basics',
                lessonDescription: 'Introduction to pandas',
                duration: 90,
              },
            ],
          },
        ],
      },
      {
        C_title: 'UI/UX Design Principles',
        C_description: 'Learn the fundamentals of user interface and user experience design. Create beautiful and functional designs.',
        C_educator: teacher._id,
        C_categories: 'design',
        C_price: 39.99,
        C_rating: 4.6,
        level: 'beginner',
        duration: 25,
        isPublished: true,
        prerequisites: [],
        sections: [
          {
            sectionTitle: 'Design Basics',
            sectionDescription: 'UI/UX fundamentals',
            lessons: [
              {
                lessonTitle: 'Color Theory',
                lessonDescription: 'Understanding colors in design',
                duration: 60,
              },
            ],
          },
        ],
      },
      {
        C_title: 'Mobile Development with React Native',
        C_description: 'Build cross-platform mobile applications using React Native. Deploy to iOS and Android.',
        C_educator: teacher._id,
        C_categories: 'mobile-development',
        C_price: 79.99,
        C_rating: 4.9,
        level: 'advanced',
        duration: 50,
        isPublished: true,
        prerequisites: ['React.js knowledge'],
        sections: [],
      },
    ]);

    console.log('✅ Courses created successfully');

    // Enroll students in courses
    await Course.findByIdAndUpdate(
      courses[0]._id,
      {
        $push: {
          enrolled: [
            {
              studentId: student1._id,
              enrollmentDate: new Date(),
              progress: 45,
              isPaid: false,
              isCompleted: false,
            },
            {
              studentId: student2._id,
              enrollmentDate: new Date(),
              progress: 20,
              isPaid: false,
              isCompleted: false,
            },
          ],
        },
      }
    );

    // Update student enrolled courses
    await User.findByIdAndUpdate(
      student1._id,
      { $push: { enrolledCourses: courses[0]._id } }
    );

    await User.findByIdAndUpdate(
      student2._id,
      { $push: { enrolledCourses: courses[0]._id } }
    );

    console.log('✅ Enrollment data created');

    console.log('\n📊 Database seeding completed successfully!\n');
    console.log('Test Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Teacher:');
    console.log('  Email: teacher@example.com');
    console.log('  Password: password123\n');
    console.log('Student:');
    console.log('  Email: student1@example.com');
    console.log('  Password: password123\n');
    console.log('Admin:');
    console.log('  Email: admin@example.com');
    console.log('  Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
