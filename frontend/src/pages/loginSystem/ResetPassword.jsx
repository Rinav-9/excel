import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function ResetPassword() {
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.otp || !form.newPassword) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(form);
      alert('Password reset successful');
      setForm({ email: '', otp: '', newPassword: '' });
      navigate('/login');
    } catch (err) {
      setError('Reset failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/22848.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl text-white space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Reset Your Password
        </h2>

        <div>
          <label className="block mb-1 text-sm text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">OTP</label>
          <input
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-300">New Password</label>
          <input
            name="newPassword"
            type="password"
            placeholder="••••••••"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition"
          />
        </div>

        {error && (
          <p className="text-red-400 text-center text-sm bg-black/30 border border-red-500/30 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-300 text-black font-semibold shadow-lg transition disabled:opacity-60"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default ResetPassword;
