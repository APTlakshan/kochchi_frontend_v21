'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiLogOut, FiEdit, FiEye, FiClock, FiCheckCircle } from 'react-icons/fi';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('access_token') || localStorage.getItem('user_token') || localStorage.getItem('admin_token');
        if (!token) {
          setError('Not logged in.');
          setLoading(false);
          return;
        }
        const res = await fetch('https://kochchibazaar.lk/api/auth/me', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await res.json();
        setUserData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone_number || '',
          photo: '/assets/discount.jpg', // Placeholder, update if API returns photo
          joinDate: data.created_at ? new Date(data.created_at).toLocaleString('default', { month: 'long', year: 'numeric' }) : '',
        });
        setEditValues({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone_number || '',
        });
      } catch (err) {
        setError(err.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditValues({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, phone: userData.phone });
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditMode(false);
  };
  const handleSave = () => {
    setUserData(prev => ({ ...prev, ...editValues }));
    setEditMode(false);
  };
  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handlePhotoEdit = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserData((prev) => ({ ...prev, photo: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock ads data
  const userAds = [
    {
      id: 1,
      title: "Premium Restaurant Promotion",
      category: "Restaurants",
      status: "completed",
      date: "2024-01-15",
      views: 245,
      image: "/assets/cards/resturent.jpg"
    },
    {
      id: 2,
      title: "Event Management Services",
      category: "Event Management",
      status: "pending",
      date: "2024-01-20",
      views: 89,
      image: "/assets/cards/eventmanagement.jpg"
    },
    {
      id: 3,
      title: "Catering Excellence",
      category: "Catering",
      status: "completed",
      date: "2024-01-10",
      views: 156,
      image: "/assets/cards/catering.jpg"
    },
    {
      id: 4,
      title: "Liquor Shop Special Offers",
      category: "Liquor Shops",
      status: "pending",
      date: "2024-01-25",
      views: 67,
      image: "/assets/cards/liquorshops.jpg"
    }
  ];

  const getStatusColor = (status) => {
    return status === 'completed' ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusIcon = (status) => {
    return status === 'completed' ? <FiCheckCircle className="w-4 h-4" /> : <FiClock className="w-4 h-4" />;
  };

  const getStatusBg = (status) => {
    return status === 'completed' ? 'bg-green-100' : 'bg-yellow-100';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading profile...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">{error}</div>;
  }
  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2 sm:px-6 lg:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Personal Info - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 flex flex-col items-center lg:items-stretch"
        >
          <div className="sticky top-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-8 lg:p-14 flex flex-col items-center gap-8 w-full max-w-full min-h-[400px] lg:min-h-[520px] lg:w-[520px] xl:w-[600px] mx-auto">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-blue-200 shadow-xl">
                <img
                  src={userData.photo}
                  alt={userData.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors border-2 border-white"
                onClick={handlePhotoEdit}
                aria-label="Edit Profile Picture"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-500 text-base lg:text-lg">Member since {userData.joinDate}</p>
            </div>
            <div className="w-full flex flex-col gap-4 mt-6">
              {/* First Name Field */}
              <div className="flex items-center bg-white rounded-xl px-6 py-4 text-lg border border-gray-200">
                <FiUser className="w-6 h-6 text-gray-500 mr-3" />
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editValues.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-gray-800 font-semibold px-2 py-1"
                  />
                ) : (
                  <div className="flex-1">
                    <span className="text-gray-500 text-sm">First Name</span>
                    <div className="text-gray-800 font-semibold">{userData.firstName}</div>
                  </div>
                )}
              </div>

              {/* Last Name Field */}
              <div className="flex items-center bg-white rounded-xl px-6 py-4 text-lg border border-gray-200">
                <FiUser className="w-6 h-6 text-gray-500 mr-3" />
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editValues.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-gray-800 font-semibold px-2 py-1"
                  />
                ) : (
                  <div className="flex-1">
                    <span className="text-gray-500 text-sm">Last Name</span>
                    <div className="text-gray-800 font-semibold">{userData.lastName}</div>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="flex items-center bg-white rounded-xl px-6 py-4 text-lg border border-gray-200">
                <FiMail className="w-6 h-6 text-gray-500 mr-3" />
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editValues.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-gray-800 font-semibold px-2 py-1"
                  />
                ) : (
                  <div className="flex-1">
                    <span className="text-gray-500 text-sm">Email</span>
                    <div className="text-gray-800 font-semibold">{userData.email}</div>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex items-center bg-white rounded-xl px-6 py-4 text-lg border border-gray-200">
                <FiPhone className="w-6 h-6 text-gray-500 mr-3" />
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={editValues.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="flex-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-gray-800 font-semibold px-2 py-1"
                  />
                ) : (
                  <div className="flex-1">
                    <span className="text-gray-500 text-sm">Phone Number</span>
                    <div className="text-gray-800 font-semibold">{userData.phone}</div>
                  </div>
                )}
              </div>

              {editMode ? (
                <div className="flex gap-3 mt-4">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-lg transition">
                    Save
                  </button>
                  <button onClick={handleCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-lg transition">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleEdit} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-lg transition">
                  <FiEdit className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-700 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 transition-colors flex items-center justify-center gap-3 text-xl"
            >
              <FiLogOut className="w-6 h-6" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* My Ads - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-8"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-1">My Advertisements</h2>
            <p className="text-gray-600">Track the status and performance of your posted ads</p>
          </div>
          {userAds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="text-2xl text-gray-400 mb-2">🗒️</span>
              <p className="text-lg text-gray-500 font-medium">No advertisements here which you posted yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {userAds.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 border border-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-44 object-cover rounded-t-3xl"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{ad.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{ad.category}</p>
                    </div>
                    <div className="text-xs text-gray-400 mb-3">
                      <span>Posted: {new Date(ad.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}