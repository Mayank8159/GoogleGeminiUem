import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Login from './pages/Login';
import Register from './pages/Register';
import Discussion from './pages/Discussion';
import NotFound from './pages/Notfound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader'; // 👈 Import the loader

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
        <Loader /> {/* 👈 Show loader before content */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;