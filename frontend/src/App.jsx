import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { MessagesProvider } from './MessagesContext';
import ProtectedRoute from './components/ProtectedRoutes';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Discussion = lazy(() => import('./pages/Discussion'));
const NotFound = lazy(() => import('./pages/Notfound'));
const EventAdmin = lazy(() => import('./pages/EventsAdmin'));
const TeamsAdmin = lazy(() => import('./pages/TeamsAdmin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ['/discussion'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
      <Loader />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <EventAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teams"
              element={
                <ProtectedRoute>
                  <TeamsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <MessagesProvider>
      <Router>
        <AppContent />
      </Router>
      <Analytics />
      <SpeedInsights />
    </MessagesProvider>
  );
}

export default App;