'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const Header = ({ fixedBg = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    if (fixedBg) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeString);
    };

    window.addEventListener('scroll', handleScroll);
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [fixedBg]);

  const menuItems = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Competition', href: '/competition' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${poppins.className} ${
        fixedBg 
          ? 'bg-black-100 backdrop-blur-md shadow-sm' 
          : isScrolled 
          ? 'bg-gray-800/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-gray-900/95 dark:bg-black/95'
      }`}>
      <nav className="w-full h-16 md:h-20">
        <div className="flex items-center justify-between h-full px-3 md:px-4">
          <div className="pl-[10px] md:pl-[40px] flex items-center h-full">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={70}
                height={10}
                priority
                className="object-contain md:mt-2 drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 pr-[40px] h-full">
            <Link href="/addpost" className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  fixedBg || isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span className="relative z-10">Post Add</span>
                <motion.div
                  className="absolute inset-0 bg-blue-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            </Link>
            <Link href="/profile" className="flex items-center">
              <div className="relative transition-transform hover:scale-105 active:scale-95">
                <FaUserCircle 
                  className={`text-xl md:text-2xl ${
                    fixedBg || isScrolled 
                      ? 'text-gray-100' 
                      : 'text-white'
                  }`}
                />
              </div>
            </Link>
            <Link href="/notifications" className="flex items-center">
              <div className="relative transition-transform hover:scale-105 active:scale-95">
                <FaBell 
                  className={`text-xl ${
                    fixedBg || isScrolled 
                      ? 'text-gray-100' 
                      : 'text-white'
                  }`}
                />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/slflag.png"
                alt="Sri Lanka Flag"
                width={50}
                height={24}
                className="rounded-sm"
              />
              <span className="text-sm font-medium text-white">{currentTime}</span>
            </div>
            <div className="h-6 w-px bg-gray-500"></div>
            <Link href="/login" className="flex items-center h-full">
              <button className="px-6 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-all duration-300">
                Log in
              </button>
            </Link>
            <Link href="/signup" className="flex items-center h-full">
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300">
                Sign up
              </button>
            </Link>
            <button
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              className="p-2 rounded-lg text-white"
            >
              {isDesktopMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3 pr-3">
            <Link href="/addpost" className="flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Post Add</span>
                <motion.div
                  className="absolute inset-0 bg-blue-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            </Link>
            <Link href="/profile" className="flex items-center">
              <div className="relative transition-transform hover:scale-105 active:scale-95">
                <FaUserCircle 
                  className={`text-xl md:text-2xl ${
                    fixedBg || isScrolled 
                      ? 'text-gray-100' 
                      : 'text-white'
                  }`}
                />
              </div>
            </Link>
            <Link href="/notifications" className="flex items-center">
              <div className="relative transition-transform hover:scale-105 active:scale-95">
                <FaBell 
                  className={`text-lg md:text-xl ${
                    fixedBg || isScrolled 
                      ? 'text-gray-100' 
                      : 'text-white'
                  }`}
                />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 md:p-2 rounded-lg text-white"
            >
              {isMobileMenuOpen ? <HiX className="w-5 h-5 md:w-6 md:h-6" /> : <HiMenu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Menu Dropdown */}
        {isDesktopMenuOpen && (
          <div className="hidden md:block absolute right-[40px] top-20 w-64 bg-gray-900/90 backdrop-blur-lg shadow-lg">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsDesktopMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-lg shadow-lg border-t border-white/20">
            <div className="px-3 py-3 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/20">
                <Image
                  src="/assets/slflag.png"
                  alt="Sri Lanka Flag"
                  width={32}
                  height={16}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium text-white">{currentTime}</span>
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block w-full text-center py-2 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/login"
                className="block w-full text-center py-2 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="block w-full text-center py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-200 transition-colors duration-200 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
