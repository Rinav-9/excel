import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../../services/authService';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      alert('OTP sent to your email');
      setOtpSent(true);
    } catch {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyOtp(email, otp);
      alert('OTP verified. You can now reset your password.');
      setOtpVerified(true);
    } catch {
      alert('Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const sharedFormStyles = "w-full max-w-md p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl text-white space-y-6";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/22848.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Form content */}
      {!otpSent && (
        <motion.form
          onSubmit={handleSendOtp}
          className={`relative z-10 ${sharedFormStyles}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Forgot Password
          </h2>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-300 text-black font-semibold shadow-lg transition hover:brightness-105 disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <p className="text-sm text-center text-gray-400">
            Remembered your password?{' '}
            <NavLink to="/login" className="text-gray-200 hover:underline">
              Login here
            </NavLink>
          </p>
        </motion.form>
      )}

      {otpSent && !otpVerified && (
        <motion.form
          onSubmit={handleVerifyOtp}
          className={`relative z-10 ${sharedFormStyles}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Verify OTP
          </h2>

          <div>
            <label className="block mb-1 text-sm text-gray-300">OTP</label>
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-300 text-black font-semibold shadow-lg transition hover:brightness-105 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </motion.form>
      )}

      {otpVerified && (
        <motion.div
          className={`relative z-10 ${sharedFormStyles} text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-6 text-lg text-white">
            OTP verified! You can now reset your password.
          </p>
          <NavLink
            to="/reset-password"
            className="inline-block px-6 py-3 bg-gradient-to-r from-white to-gray-300 rounded-full text-black font-semibold shadow-lg hover:brightness-110 transition"
          >
            Reset Password
          </NavLink>
        </motion.div>
      )}
    </div>
  );
}

export default ForgotPassword;
