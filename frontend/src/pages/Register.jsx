import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://googlegeminiuem.onrender.com/api/auth/register', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md mt-12 sm:mt-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/main.png"
            alt="Gemini Logo"
            className="h-14 w-14 rounded-xl shadow-md hover:scale-105 transition"
          />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          ✨ Create Your GGSC Account
        </h2>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mb-4 text-center"
          >
            {errorMsg}
          </motion.div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-[#F4B400]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-[#4285F4]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-[#DB4437]"
          />

          {/* Animated Button */}
          <motion.button
            onClick={handleRegister}
            disabled={loading}
            whileHover={{
              scale: 1.05,
              backgroundColor: '#0F9D58',
              boxShadow: '0 0 15px #F4B400',
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-[#4285F4] rounded-lg font-semibold transition relative overflow-hidden"
          >
            <span className="relative z-10">
              {loading ? 'Creating account...' : 'Register'}
            </span>
            <span className="absolute inset-0 bg-white/10 rounded-lg blur-sm animate-pulse" />
          </motion.button>
        </div>

        {/* Login Link */}
        <p className="text-sm text-white/50 mt-4 text-center">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#F4B400] hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </main>
  );
}