import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          className="fw-bold"
        >
          Study App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link onClick={() => navigate('/courses')}>Browse</Nav.Link>
                <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                <Nav.Link className="me-2">{user?.name}</Nav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="nav-button"
                >
                  Home
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="nav-button"
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="nav-button"
                  >
                    Register
                  </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
