import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CourseListing } from './pages/CourseListing';
import { CourseDetail } from './pages/CourseDetail';
import { CreateCourse } from './pages/CreateCourse';
import { StudentDashboard, TeacherDashboard, AdminDashboard } from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navigation />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<CourseListing />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route
                path="/create-course"
                element={
                  <ProtectedRoute>
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Dashboard Router based on user type
const Dashboard = () => {
  const { user } = useAuth();

  if (user?.type === 'student') return <StudentDashboard />;
  if (user?.type === 'teacher') return <TeacherDashboard />;
  if (user?.type === 'admin') return <AdminDashboard />;
  return <Navigate to="/" />;
};

import { useAuth } from './context/AuthContext';

export default App;
