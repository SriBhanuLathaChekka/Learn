import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                Small App, Big Dreams: Elevating Your Education
              </h1>
              <p className="lead mb-4">
                Master new skills at your own pace. Access thousands of courses from expert instructors in technology, design, business, and more.
              </p>
              <div className="d-flex gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Why Choose Study App?</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h5>Diverse Courses</h5>
                <p>Choose from thousands of courses across multiple categories and skill levels.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h5>Self-Paced Learning</h5>
                <p>Learn at your own pace. Access course materials anytime, anywhere.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h5>Certifications</h5>
                <p>Earn digital certificates upon course completion to boost your career.</p>
              </div>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h5>Community</h5>
                <p>Connect with instructors and learners through discussion forums.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-white" style={{ background: '#2c2c4e' }}>
        <Container className="text-center">
          <h2 className="mb-4">Ready to Start Learning?</h2>
          <Button
            size="lg"
            variant="light"
            onClick={() => navigate('/register')}
          >
            Sign Up for Free
          </Button>
        </Container>
      </section>
    </>
  );
};
