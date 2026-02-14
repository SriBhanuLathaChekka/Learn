import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer mt-5 py-4 bg-dark text-white">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold mb-3">Study App</h6>
            <p>Your center for skill enhancement and continuous learning.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#courses">Courses</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div>
              <a href="#" className="me-3">Facebook</a>
              <a href="#" className="me-3">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Copyright Study App</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
