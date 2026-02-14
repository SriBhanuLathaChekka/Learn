const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    C_title: {
      type: String,
      required: true,
      trim: true,
    },
    C_description: {
      type: String,
      required: true,
    },
    C_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    C_categories: {
      type: String,
      required: true,
    },
    C_price: {
      type: Number,
      default: 0,
    },
    C_rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    sections: [
      {
        sectionTitle: String,
        sectionDescription: String,
        lessons: [
          {
            lessonTitle: String,
            lessonDescription: String,
            videoUrl: String,
            materials: [String],
            duration: Number, // in minutes
          },
        ],
      },
    ],
    enrolled: [
      {
        studentId: mongoose.Schema.Types.ObjectId,
        enrollmentDate: Date,
        progress: {
          type: Number,
          default: 0,
        },
        isPaid: {
          type: Boolean,
          default: false,
        },
        completionDate: Date,
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    prerequisites: [String],
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    duration: Number, // total duration in hours
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
