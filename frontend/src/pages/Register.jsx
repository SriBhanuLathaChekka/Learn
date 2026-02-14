import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Auth.css';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <div className="auth-box">
            <h2 className="text-center mb-4">LearnHub Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select User</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Form.Select>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Registering...' : 'SIGN UP'}
              </Button>
            </Form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
