import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Spinner, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getMyCourses();
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const completedCourses = courses.filter((course) => {
    const enrollment = course.enrolled.find((e) => e.studentId === user?.userId);
    return enrollment?.isCompleted;
  });

  const enrolledCourses = courses.filter((course) => {
    const enrollment = course.enrolled.find((e) => e.studentId === user?.userId);
    return !enrollment?.isCompleted;
  });

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="dashboard-wrapper">
      <Container className="py-5">
        <div className="dashboard-header mb-5">
          <h1>Welcome, {user?.name}!</h1>
          <p className="text-muted">Continue learning and achieve your goals</p>
        </div>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'enrolled'}
            onClick={() => setActiveTab('enrolled')}
          >
            Enrolled Courses ({enrolledCourses.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
          >
            Completed Courses ({completedCourses.length})
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'enrolled' && (
        <Row>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => {
              const enrollment = course.enrolled.find((e) => e.studentId === user?.userId);
              return (
                <Col md={6} lg={4} key={course._id} className="mb-4">
                  <Card className="course-card h-100">
                    <Card.Body>
                      <Card.Title>{course.C_title}</Card.Title>
                      <Card.Text className="text-muted">{course.C_educator?.name}</Card.Text>

                      <div className="progress mb-3">
                        <div
                          className="progress-bar"
                          style={{ width: `${enrollment?.progress || 0}%` }}
                        >
                          {enrollment?.progress || 0}%
                        </div>
                      </div>

                      <Button variant="primary" className="w-100">
                        Continue Learning
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Alert variant="info">No enrolled courses yet. Browse courses to get started!</Alert>
          )}
        </Row>
      )}

      {activeTab === 'completed' && (
        <Row>
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Col md={6} lg={4} key={course._id} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Body>
                    <Card.Title>{course.C_title}</Card.Title>
                    <p className="text-muted">✓ Completed</p>
                    <Button variant="success" className="w-100">
                      Download Certificate
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Alert variant="info">No completed courses yet.</Alert>
          )}
        </Row>
      )}
      </Container>
    </div>
  );
};

export const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherCourses();
  }, []);

  const fetchTeacherCourses = async () => {
    try {
      setLoading(true);
      // Fetch courses created by teacher
      // This would need a separate endpoint
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = () => {
    navigate('/create-course');
  };

  return (
    <div className="dashboard-wrapper">
      <Container className="py-5">
        <div className="dashboard-header mb-5">
          <h1>Teacher Dashboard</h1>
          <Button variant="primary" onClick={handleCreateCourse}>+ Create New Course</Button>
        </div>

        <Row>
          <Col md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>0</h3>
                <p>Courses Created</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>0</h3>
                <p>Total Students</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>0</h3>
                <p>Enrollments</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockUsers = [
        { _id: '652e2c7a142cd8d1427fb25', name: 'Admin', email: 'admin@mail.com', type: 'Admin' },
        { _id: '652ea646d508d4f04e07247', name: 'Teacher 1', email: 't1@mail.com', type: 'Teacher' },
        { _id: '652ea7dec508d4f04e0724a', name: 'Student 1', email: 's1@mail.com', type: 'Student' },
        { _id: '652ea93ed508d4f04e0724d', name: 'Student 2', email: 's2@mail.com', type: 'Student' },
        { _id: '65c0be2360d821293c2432', name: 'Teacher 4', email: 't4@mail.com', type: 'Teacher' },
      ];
      setUsers(mockUsers);
      setStats({
        totalUsers: mockUsers.length,
        totalCourses: 0,
        totalEnrollments: 0,
      });
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Delete user logic here
        setUsers(users.filter(u => u._id !== userId));
        alert('User deleted successfully');
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="dashboard-wrapper">
      <Container className="py-5">
        <div className="dashboard-header mb-5">
          <h1>Admin Dashboard</h1>
        </div>

        <Row className="mb-5">
          <Col md={4}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>{stats.totalUsers}</h3>
                <p>Total Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>{stats.totalCourses}</h3>
                <p>Total Courses</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card text-center">
              <Card.Body>
                <h3>{stats.totalEnrollments}</h3>
                <p>Total Enrollments</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="admin-table-container">
          <h2 className="mb-4">User Management</h2>
          <Table striped bordered hover className="admin-table">
            <thead className="table-dark">
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="user-id">{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge-${user.type.toLowerCase()}`}>
                      {user.type}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user._id)}
                      className="delete-btn"
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};
