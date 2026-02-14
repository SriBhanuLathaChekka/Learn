import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './CreateCourse.css';

export const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    C_title: '',
    C_description: '',
    C_categories: '',
    C_price: 0,
    level: 'beginner',
    duration: '',
    prerequisites: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.C_title || !formData.C_description) {
      setError('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      const coursePayload = {
        ...formData,
        prerequisites: formData.prerequisites
          ? formData.prerequisites.split(',').map((p) => p.trim())
          : [],
      };

      await courseAPI.createCourse(coursePayload);
      alert('Course created successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-wrapper">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="create-course-card">
              <Card.Body>
                <h1 className="mb-4">Create New Course</h1>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="C_title"
                      placeholder="Enter course title"
                      value={formData.C_title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="C_description"
                      placeholder="Enter course description"
                      value={formData.C_description}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="C_categories"
                      placeholder="e.g., Programming, Design"
                      value={formData.C_categories}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="C_price"
                          placeholder="0"
                          value={formData.C_price}
                          onChange={handleChange}
                          min="0"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Level</Form.Label>
                        <Form.Select
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Duration (in hours)</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      placeholder="e.g., 20 hours"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Prerequisites (comma-separated)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="prerequisites"
                      placeholder="e.g., HTML, CSS, JavaScript"
                      value={formData.prerequisites}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Course'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/dashboard')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
