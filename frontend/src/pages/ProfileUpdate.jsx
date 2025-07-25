import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import userService from '../services/userService';
import useAuthStore from '../store/authStore';

export default function ProfileUpdate() {
  const updateUser = useAuthStore((state) => state.updateUser);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (profile.password && profile.password !== profile.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        name: profile.name,
        email: profile.email,
      };
      if (profile.password) updateData.password = profile.password;

      const updatedUser = await userService.updateProfile(updateData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully.');
      setProfile({ ...profile, password: '', confirmPassword: '' });
    } catch {
      setError('Failed to update profile. Please try again.');
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Update Your Profile
        </h2>

        <p className="text-sm text-gray-300 mb-6 text-center">
          Update your personal info or change your password for security.
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-gray-900/80 text-red-400 border border-red-600 px-4 py-3 rounded-md mb-5 text-sm">
            <FiXCircle /> {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-gray-900/80 text-green-400 border border-green-600 px-4 py-3 rounded-md mb-5 text-sm">
            <FiCheckCircle /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-white to-gray-400 text-black font-semibold shadow-lg transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Your data is private and secure.
        </p>
      </div>
    </div>
  );
}
