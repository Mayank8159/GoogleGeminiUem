import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoutes';

// Context & Analytics Imports
import { MessagesProvider } from './MessagesContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// --- Lazy Loaded Pages ---
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Discussion = lazy(() => import('./pages/Discussion'));
const NotFound = lazy(() => import('./pages/Notfound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EventAdmin = lazy(() => import('./pages/EventsAdmin'));
const TeamsAdmin = lazy(() => import('./pages/TeamsAdmin'));

// Round Pages
const Round1 = lazy(() => import('./pages/rounds/round1'));
const Round2 = lazy(() => import('./pages/rounds/round2'));


/**
 * AppContent handles the conditional rendering logic for 
 * Layout components based on the current URL path.
 */
function AppContent() {
  const location = useLocation();

  // Define routes where specific layout elements should be HIDDEN
  const hideNavbarRoutes = ['/round1', '/round2', '/round3'];
  const hideFooterRoutes = ['/discussion', '/round1', '/round2', '/round3'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white">
      {/* Conditional Navbar: Hidden in Rounds for full-screen immersion */}
      {shouldShowNavbar && <Navbar />}
      
      <main className="flex-grow">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <Loader />
            </div>
          }
        >
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discussion" element={<Discussion />} />
            
            {/* --- Round Routes (Full Screen) --- */}
            <Route path="/round1" element={<Round1 />} />
            <Route path="/round2" element={<Round2 />} />

            {/* --- Admin Routes (Protected) --- */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
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

            {/* --- 404 Route --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Conditional Footer: Hidden in Discussion and Rounds */}
      {shouldShowFooter && <Footer />}
    </div>
  );
}

/**
 * Root App Component
 */
function App() {
  return (
    <MessagesProvider>
      <Router>
        <AppContent />
      </Router>
      
      {/* Performance & Analytics Monitoring */}
      <Analytics />
      <SpeedInsights />
    </MessagesProvider>
  );
}

export default App;