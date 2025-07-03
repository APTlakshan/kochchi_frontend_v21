'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('https://kochchibazaar.lk/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send reset email');
      }
      setSuccess('If this email is registered, a password reset link has been sent.');
      setShowReset(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    setResetLoading(true);
    try {
      const res = await fetch('https://kochchibazaar.lk/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to reset password');
      }
      setResetSuccess('Your password has been reset successfully. You can now log in with your new password.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setResetError(err.message || 'Something went wrong');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        {!showReset && (
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">Forgot Password</h1>
            <p className="text-gray-600 text-center mb-4">Enter your email address to receive a password reset link.</p>
            {error && <div className="text-red-600 text-center">{error}</div>}
            {success && <div className="text-green-600 text-center">{success}</div>}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
                required
                placeholder="you@email.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        {showReset && (
          <form onSubmit={handleReset}>
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">Reset Password</h1>
            <p className="text-gray-600 text-center mb-4">Enter the token you received in your email and your new password.</p>
            {resetError && <div className="text-red-600 text-center">{resetError}</div>}
            {resetSuccess && <div className="text-green-600 text-center">{resetSuccess}</div>}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-800">Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
                required
                placeholder="Paste your reset token here"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-gray-800">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
                required
                placeholder="Enter new password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
              disabled={resetLoading}
            >
              {resetLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
