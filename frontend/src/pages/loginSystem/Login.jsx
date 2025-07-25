import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      alert('Logged in successfully');
      navigate('/userDashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/22848.jpg')",
      }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-400 text-black font-semibold hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-300">
          <NavLink
            to="/forgot-password"
            className="hover:text-white transition duration-200"
          >
            Forgot Password?
          </NavLink>
          <NavLink
            to="/signup"
            className="hover:text-white transition duration-200"
          >
            Don't have an account?
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
