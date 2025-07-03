'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaCheckCircle } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

function ContactPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4 ${poppins.className}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-lg flex max-w-7xl w-full overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section: Image */}
        <motion.div
          className="hidden md:block md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          <Image
            src="/assets/cards/catering.jpg"
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-l-2xl"
          />
        </motion.div>
        {/* Right Section: Contact Info + Social + Newsletter */}
        <motion.div
          className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center"
          variants={containerVariants}
        >
          <motion.div className="flex items-center gap-2 mb-8" variants={itemVariants}>
            <Image
              src="/assets/logo.png"
              alt="Kochchibazaar Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-2xl font-bold text-gray-800">Kochchibazaar.</span>
          </motion.div>
          <motion.h1 className="text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Contact Us
          </motion.h1>
          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            Reach out to us using any of the methods below.
          </motion.p>
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 text-xl" />
              <span className="font-semibold text-gray-700">WhatsApp Only:</span>
              <a
                href="https://wa.me/94713223344"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium"
              >
                +94 71 322 3344
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <span className="font-semibold text-gray-700">Our Location:</span>
              <span className="text-gray-600">
                Lakro International (Private) Limited, Batuwatta Road, Ganemulla, Sri Lanka
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 text-xl" />
              <span className="font-semibold text-gray-700">Email Us:</span>
              <a
                href="mailto:info@kochchibazzar.lk"
                className="text-blue-700 hover:underline font-medium"
              >
                info@kochchibazzar.lk
              </a>
            </div>
            {/* Social Media Row */}
            <div className="flex flex-col items-start gap-2 mt-6">
              <span className="font-semibold text-gray-700 mb-1">Follow us on:</span>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/kochchibazaarofficial" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors" title="Facebook">
                  <FaFacebook size={22} />
                </a>
                <a href="https://www.instagram.com/kochchibazaarofficial/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white p-2 rounded-full transition-colors" title="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href="https://www.youtube.com/@kochchibazaarofficial" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors" title="YouTube">
                  <FaYoutube size={22} />
                </a>
                <a href="https://www.linkedin.com/company/kochchibazaarofficial" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-full transition-colors" title="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://www.tiktok.com/@kochchibazaarofficial" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-colors" title="TikTok">
                  <SiTiktok size={22} />
                </a>
                <a href="https://wa.me/+94713223344" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors" title="WhatsApp">
                  <FaWhatsapp size={22} />
                </a>
              </div>
            </div>
            {/* Newsletter Signup (integrated) */}
            <div className="mt-8 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to our Newsletter</h2>
              <p className="text-gray-600 mb-4 text-left max-w-md">Get the latest updates, news, and offers from Kochchibazaar directly to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 text-gray-800"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  disabled={subscribed}
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 shadow-sm animate-fade-in">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                  <span className="text-green-800 font-semibold text-lg">Thank you for subscribing!</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContactPage;
