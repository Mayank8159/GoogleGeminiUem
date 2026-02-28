import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Register() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
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
    <main
      className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-10 transition-colors duration-500 relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#0a0f14] via-[#151b23] to-[#1e2530] text-white'
          : 'bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] text-gray-900'
      }`}
    >
      <motion.div
        className="absolute inset-0 opacity-50 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)',
            'radial-gradient(800px at 50% 30%, rgba(244, 180, 0, 0.12) 0%, transparent 50%)',
            'radial-gradient(800px at 80% 70%, rgba(15, 157, 88, 0.12) 0%, transparent 50%)',
            'radial-gradient(800px at 20% 50%, rgba(66, 133, 244, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full max-w-md backdrop-blur-xl rounded-3xl p-8 sm:p-10 relative overflow-hidden border shadow-2xl z-10 ${
          isDark
            ? 'bg-white/8 border-white/10'
            : 'bg-white/90 border-white/20'
        }`}
      >
        <motion.div
          className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-r from-[#4285F4]/20 to-[#F4B400]/20 rounded-full blur-3xl pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="flex justify-center mb-6 relative z-10"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(66, 133, 244, 0.3)',
                '0 0 40px rgba(244, 180, 0, 0.3)',
                '0 0 20px rgba(15, 157, 88, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#4285F4] via-[#F4B400] to-[#0F9D58] flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-[#4285F4] via-[#F4B400] to-[#0F9D58] bg-clip-text text-transparent relative z-10">
          Create Account
        </h2>
        <p className={`text-sm text-center mb-6 relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Join the GGSC community with your new profile
        </p>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-xl border text-sm mb-4 text-center relative z-10 ${
              isDark ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
            }`}
          >
            {errorMsg}
          </motion.div>
        )}

        <div className="space-y-4 relative z-10">
          <div className="relative">
            <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-[#F4B400]" />
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-[#4285F4]/20 outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 focus:border-[#4285F4] text-white placeholder-white/50'
                  : 'bg-white/80 border-gray-200 focus:border-[#4285F4] text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-[#4285F4]" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-[#4285F4]/20 outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 focus:border-[#4285F4] text-white placeholder-white/50'
                  : 'bg-white/80 border-gray-200 focus:border-[#4285F4] text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-[#DB4437]" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-12 pr-14 py-4 rounded-xl border focus:ring-2 focus:ring-[#4285F4]/20 outline-none transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 focus:border-[#4285F4] text-white placeholder-white/50'
                  : 'bg-white/80 border-gray-200 focus:border-[#4285F4] text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className="absolute right-3 inset-y-0 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`p-1 rounded transition-colors ${
                  isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            onClick={handleRegister}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`btn-pattern btn-primary w-full py-4 rounded-xl text-white shadow-lg transition-all ${
              loading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:shadow-[0_0_24px_rgba(30,41,59,0.35)]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </div>

        <p className={`text-sm mt-5 text-center relative z-10 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#F4B400] hover:text-[#4285F4] hover:underline cursor-pointer transition-colors"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </main>
  );
}