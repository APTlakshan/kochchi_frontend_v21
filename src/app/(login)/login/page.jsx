'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { FaGoogle } from 'react-icons/fa'; // Import Google icon
import { motion } from 'framer-motion'; // Import motion
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

function LoginPage() {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://kochchibazaar.lk/api/auth/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      if (!res.ok) {
        throw new Error('Invalid email or password');
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      router.push('/'); // Redirect to home page
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4 ${poppins.className}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-lg flex max-w-6xl w-full overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section: Form */}
        <motion.div 
          className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center"
          variants={containerVariants} // Apply container variants for staggered effect on children
        >
          <motion.div 
            className="flex justify-between items-center mb-8"
            variants={itemVariants}
          >
            <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/assets/logo.png"
                  alt="Kochchibazaar Logo"
                  width={40}
                  height={40}
                  priority
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Kochchibazaar.
              </motion.span>
            </div>
          </motion.div>

          <motion.h1 className="text-4xl font-bold text-gray-900 mb-2" variants={itemVariants}>
            Log In
          </motion.h1>
          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            Welcome back! Please enter your details.
          </motion.p>

          <motion.form onSubmit={handleLogin}>
            <motion.div className="mb-4" variants={itemVariants}>
              <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">EMAIL</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800" required />
            </motion.div>
            <motion.div className="mb-3" variants={itemVariants}>
              <label htmlFor="password" className="block text-xs font-medium text-gray-500 mb-1">PASSWORD</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800" required />
            </motion.div>
            <motion.div className="text-right mb-6" variants={itemVariants}>
              <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
            </motion.div>
            {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
            <motion.button 
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold mb-3 disabled:opacity-60"
              variants={itemVariants}
              whileHover={{ scale: 1.02, backgroundColor: "#333" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </motion.button>
          </motion.form>

          <motion.button 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <FaGoogle className="text-xl" />
            Sign in with Google
          </motion.button>

          <motion.p className="text-center text-gray-600 text-sm" variants={itemVariants}>
            Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </motion.p>
        </motion.div>

        {/* Right Section: Image */}
        <motion.div 
          className="hidden md:block md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <Image
            src="/assets/cards/resturent.jpg"
            alt="Tropical Leaf Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-r-2xl"
          />
          <div className="absolute top-6 right-6 flex space-x-3">
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
