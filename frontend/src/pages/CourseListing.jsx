import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { courseAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './CourseListing.css';

export const CourseListing = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    level: '',
  });

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAllCourses(filters);
      setCourses(response.data);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseAPI.enrollCourse(courseId);
      alert('Enrolled successfully!');
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="courses-listing-wrapper">
      <Container className="py-5">
        <h1 className="mb-4" style={{color: '#333'}}>Trending Courses</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search courses..."
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">Design</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Level</Form.Label>
            <Form.Select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {courses.map((course) => (
          <Col md={6} lg={4} key={course._id} className="mb-4">
            <Card className="course-card h-100">
              {course.thumbnail && (
                <Card.Img variant="top" src={course.thumbnail} />
              )}
              <Card.Body>
                <Card.Title>{course.C_title}</Card.Title>
                <p className="text-muted">
                  by <strong>{course.C_educator?.name}</strong>
                </p>
                <Card.Text>{course.C_description.substring(0, 100)}...</Card.Text>
                <div className="mb-3">
                  <span className="badge bg-primary me-2">{course.level}</span>
                  <span className="badge bg-success">{course.C_categories}</span>
                </div>
                {course.C_price > 0 && (
                  <p className="fw-bold text-primary">${course.C_price}</p>
                )}
                {user?.type === 'student' && (
                  <Button
                    variant="success"
                    onClick={() => handleEnroll(course._id)}
                    className="w-100"
                  >
                    Enroll Now
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
    </div>
  );
};
