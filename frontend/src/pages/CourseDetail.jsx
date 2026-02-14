import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
import { courseAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './CourseDetail.css';

export const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourseDetail();
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getCourseDetail(id);
      setCourse(response.data);

      // Check if user is enrolled
      const isEnrolled = response.data.enrolled.some(
        (e) => e.studentId.toString() === user?.userId
      );
      setEnrolled(isEnrolled);
    } catch (err) {
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      await courseAPI.enrollCourse(id);
      alert('Enrolled successfully!');
      setEnrolled(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error || !course) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="course-detail-wrapper">
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <h1 className="mb-3">{course.C_title}</h1>
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt={course.C_title}
              className="img-fluid rounded mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          )}

          <Tabs defaultActiveKey="overview" className="mb-4">
            <Tab eventKey="overview" title="Overview">
              <div className="mt-3">
                <h5>About this course</h5>
                <p>{course.C_description}</p>

                <h5>Course Details</h5>
                <ul>
                  <li>Level: <strong>{course.level}</strong></li>
                  <li>Category: <strong>{course.C_categories}</strong></li>
                  <li>Duration: <strong>{course.duration} hours</strong></li>
                  <li>Students Enrolled: <strong>{course.enrolled.length}</strong></li>
                </ul>

                {course.prerequisites.length > 0 && (
                  <>
                    <h5>Prerequisites</h5>
                    <ul>
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Tab>

            <Tab eventKey="curriculum" title="Curriculum">
              <div className="mt-3">
                {course.sections.map((section, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Header>
                      <strong>Section {index + 1}: {section.sectionTitle}</strong>
                    </Card.Header>
                    <Card.Body>
                      <p>{section.sectionDescription}</p>
                      {section.lessons && section.lessons.length > 0 && (
                        <div>
                          <h6>Lessons:</h6>
                          <ul>
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex}>
                                {lesson.lessonTitle} ({lesson.duration} min)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>

            <Tab eventKey="instructor" title="Instructor">
              <div className="mt-3">
                <h5>{course.C_educator?.name}</h5>
                <p>{course.C_educator?.email}</p>
              </div>
            </Tab>
          </Tabs>
        </Col>

        <Col lg={4}>
          <Card className="position-sticky" style={{ top: '20px' }}>
            <Card.Body>
              <h4 className="mb-3">${course.C_price}</h4>
              {enrolled ? (
                <Alert variant="success">You are enrolled in this course</Alert>
              ) : (
                <Button
                  variant="success"
                  onClick={handleEnroll}
                  className="w-100 mb-3"
                  disabled={!user || user.type !== 'student'}
                >
                  Enroll Now
                </Button>
              )}

              <Card.Text className="text-muted">
                <strong>Instructor:</strong> {course.C_educator?.name}
              </Card.Text>
              <Card.Text className="text-muted">
                <strong>Rating:</strong> ⭐ {course.C_rating}/5
              </Card.Text>
              <Card.Text className="text-muted">
                <strong>Students:</strong> {course.enrolled.length}
              </Card.Text>

              {enrolled && (
                <Button variant="primary" className="w-100">
                  Go to Course
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
};
