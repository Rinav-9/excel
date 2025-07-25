import { useState } from 'react';
import authService from '../../services/authService.js';
import useAuthStore from '../../store/authStore.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(form);
      alert('Signup successful');
      await login({ email: form.email, password: form.password });

      if (form.role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Signup failed: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/22848.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl text-white space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
          Create Your Account
        </h2>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-300">Role</label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-400 text-black font-semibold shadow-lg transition-transform duration-200"
        >
          Sign Up
        </motion.button>

        <p className="text-sm text-center text-gray-300">
          Already have an account?{" "}
          <NavLink to="/login" className="text-white hover:underline">
            Login here
          </NavLink>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;
