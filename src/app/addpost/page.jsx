'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import { FaStar, FaCrown, FaEye, FaImages, FaArrowUp, FaCheckCircle } from 'react-icons/fa';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const specialties = [
  "Normal Restaurants", "African", "Arabic", "BBQ / Grill", "Burghers/ Submarines/ Hotdogs",
  "Cake Shops/Cake Designers", "Chinese", "Chocolate Shops", "Coffee Shops / Tea Shops",
  "Continental", "Fine Dining", "Fried Chicken Shops", "German", "Ice Cream Shops",
  "Indian", "Indonesian", "Italian (Mix)", "Japanese", "Korean", "Mexican", "Mongolian",
  "Other", "Pakistani", "Pastry and Bakery (Mix)", "Pizza", "Russian", "Seafood",
  "Singaporean", "Snack Bars / Juice Bars", "Soya Food", "Spanish", "Street Food",
  "Sweet Shops", "Thai", "Vegetarian"
];

const categories = [
  "Restaurant",
  "Restaurant with Liquor",
  "Liquor Shops",
  "Catering Services",
  "Day-out Packages",
  "Event Management Companies",
  "Reception Halls",
  "Restaurant Promotions",
  "Dansal",
  "Sri Lankan Worldwide Restaurant"
];

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
  "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const cities = {
  "Ampara": ["Ampara", "Akkaraipattu", "Kalmunai", "Sammanthurai", "Addalaichenai", "Ninthavur", "Irakkamam", "Pottuvil", "Sainthamaruthu", "Dehiattakandiya", "Lahugala", "Uhana", "Mahaoya"],
  "Anuradhapura": ["Anuradhapura", "Kekirawa", "Mihintale", "Nochchiyagama", "Galenbindunuwewa", "Medawachchiya", "Thambuttegama", "Horowpathana", "Kahatagasdigiliya", "Padaviya"],
  "Badulla": ["Badulla", "Bandarawela", "Haputale", "Ella", "Hali-Ela", "Passara", "Mahiyanganaya", "Welimada", "Diyatalawa", "Lunugala", "Meegahakivula", "Soranatota"],
  "Batticaloa": ["Batticaloa", "Eravur", "Kattankudy", "Kaluwanchikudy", "Valaichchenai", "Oddamavadi", "Chenkalady", "Arayampathy", "Vakarai"],
  "Colombo": ["Colombo", "Dehiwala-Mount Lavinia", "Moratuwa", "Maharagama", "Kottawa", "Nugegoda", "Piliyandala", "Homagama", "Battaramulla", "Kolonnawa", "Kesbewa", "Boralesgamuwa", "Rajagiriya", "Angoda", "Rathmalana"],
  "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Ahungalla", "Bentota (partially)", "Karandeniya", "Imaduwa", "Balapitiya", "Udugama"],
  "Gampaha": ["Negombo", "Gampaha", "Ja-Ela", "Wattala", "Ragama", "Minuwangoda", "Katunayake", "Kelaniya", "Nittambuwa", "Ganemulla", "Kiribathgoda", "Kandana", "Seeduwa", "Divulapitiya", "Mirigama"],
  "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Ambalantota", "Beliatta", "Weeraketiya", "Suriyawewa", "Sooriyawewa", "Walasmulla", "Lunugamvehera", "Kirinda"],
  "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Kopay", "Kodikamam", "Karainagar", "Atchuvely", "Manipay", "Navaly"],
  "Kalutara": ["Kalutara", "Panadura", "Beruwala", "Aluthgama", "Horana", "Matugama", "Bandaragama", "Ingiriya", "Bulathsinhala", "Payagala", "Dodangoda"],
  "Kandy": ["Kandy", "Peradeniya", "Katugastota", "Gampola", "Nawalapitiya", "Kundasale", "Akurana", "Pallekele", "Gelioya", "Wattegama", "Teldeniya", "Galagedara"],
  "Kegalle": ["Kegalle", "Mawanella", "Rambukkana", "Warakapola", "Aranayake", "Ruwanwella", "Deraniyagala", "Yatiyanthota", "Dehiowita"],
  "Kilinochchi": ["Kilinochchi", "Paranthan", "Pooneryn", "Pallai", "Kandawalai"],
  "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Nikaweratiya", "Polgahawela", "Pannala", "Alawwa", "Mawathagama", "Narammala", "Wariyapola", "Ganewatta", "Rideegama"],
  "Mannar": ["Mannar", "Thalaimannar", "Murunkan", "Pesalai", "Erukkalampiddy"],
  "Matale": ["Matale", "Dambulla", "Rattota", "Ukuwela", "Naula", "Galewela", "Pallepola", "Sigiriya"],
  "Matara": ["Matara", "Weligama", "Akuressa", "Dikwella", "Kamburupitiya", "Deniyaya", "Hakmana", "Devinuwara", "Kirinda Puhulwella"],
  "Monaragala": ["Monaragala", "Wellawaya", "Bibile", "Siyambalanduwa", "Madulla", "Thanamalwila"],
  "Mullaitivu": ["Mullaitivu", "Puthukudiyiruppu", "Oddusuddan", "Thunukkai", "Visuamadu"],
  "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Talawakele", "Lindula", "Ragala", "Walapane", "Kandapola", "Kotagala"],
  "Polonnaruwa": ["Polonnaruwa", "Hingurakgoda", "Medirigiriya", "Minneriya", "Dimbulagala", "Welikanda", "Thamankaduwa"],
  "Puttalam": ["Puttalam", "Chilaw", "Anamaduwa", "Wennappuwa", "Mundalama", "Marawila", "Dankotuwa", "Nattandiya", "Norochcholai", "Madampe"],
  "Ratnapura": ["Ratnapura", "Balangoda", "Embilipitiya", "Eheliyagoda", "Pelmadulla", "Kalawana", "Kuruwita", "Rakwana", "Nivithigala"],
  "Trincomalee": ["Trincomalee", "Kantale", "Kinniya", "Nilaveli", "Mutur", "Thampalakamam", "Thoppur"],
  "Vavuniya": ["Vavuniya", "Cheddikulam", "Nedunkeni", "Vavunikulam"]
};

function Page() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    mobileNumber: '',
    whatsapp: '',
    email: '',
    website: '',
    googleMapLocation: '',
    district: '',
    city: '',
    country: '',
    state: '',
    halalAvailability: 'No',
    openingTimes: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    closingTimes: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    description: '',
    images: [],
    category: '',
    specialties: [],
    carouselAdd: false,
    topAdd: false
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [showLiquorWarning, setShowLiquorWarning] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [menuOptions, setMenuOptions] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCoords, setSelectedCoords] = useState({ lat: 6.9271, lng: 79.8612 }); // Default to Colombo
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Load Leaflet CSS and JS
  useEffect(() => {
    if (window.L && window.L.map) return;
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletScript.async = true;
    leafletScript.onload = () => initMap();
    document.body.appendChild(leafletScript);
    return () => {
      document.head.removeChild(leafletCSS);
      document.body.removeChild(leafletScript);
    };
  }, []);

  // Initialize map and marker
  useEffect(() => {
    if (window.L && window.L.map && mapRef.current) {
      initMap();
    }
    // eslint-disable-next-line
  }, [mapRef.current]);

  const initMap = () => {
    if (!window.L || !mapRef.current) return;
    // Remove any existing map instance
    if (mapRef.current._leaflet_id) {
      mapRef.current._leaflet_id = null;
      mapRef.current.innerHTML = '';
    }
    const map = window.L.map(mapRef.current).setView([selectedCoords.lat, selectedCoords.lng], 10);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    let marker = window.L.marker([selectedCoords.lat, selectedCoords.lng], { draggable: true }).addTo(map);
    markerRef.current = marker;
    // On map click, move marker and update state
    map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      marker.setLatLng([lat, lng]);
      setSelectedCoords({ lat, lng });
      setFormData((prev) => ({ ...prev, googleMapLocation: `${lat},${lng}` }));
    });
    // On marker drag end, update state
    marker.on('dragend', (e) => {
      const lat = e.target.getLatLng().lat;
      const lng = e.target.getLatLng().lng;
      setSelectedCoords({ lat, lng });
      setFormData((prev) => ({ ...prev, googleMapLocation: `${lat},${lng}` }));
    });
  };

  // Build the JSON object for preview and submission (move outside handleSubmit)
  const adData = {
    shopName: formData.restaurantName,
    contact: {
      address: formData.address,
      phone: formData.mobileNumber,
      whatsapp: formData.whatsapp,
      email: formData.email,
      website: formData.website,
    },
    location: {
      googleMapLocation: formData.googleMapLocation,
      city: formData.city,
      district: formData.district,
      province: formData.state || '',
      country: formData.country || 'Sri Lanka',
      state: formData.state || 'N/A',
    },
    business: {
      category: formData.category,
      specialty: formData.specialties[0] || '',
      tags: formData.specialties,
      halalAvailable: formData.halalAvailability === 'Yes',
      description: formData.description,
      menuOptions: menuOptions.length > 0 ? menuOptions : ["Rice & Curry", "Biryani"],
    },
    schedule: {
      mon: [formData.openingTimes.monday && formData.closingTimes.monday ? `${formData.openingTimes.monday}-${formData.closingTimes.monday}` : '10:00-22:00'],
      tue: [formData.openingTimes.tuesday && formData.closingTimes.tuesday ? `${formData.openingTimes.tuesday}-${formData.closingTimes.tuesday}` : '10:00-22:00'],
      wed: [formData.openingTimes.wednesday && formData.closingTimes.wednesday ? `${formData.openingTimes.wednesday}-${formData.closingTimes.wednesday}` : '10:00-22:00'],
      thu: [formData.openingTimes.thursday && formData.closingTimes.thursday ? `${formData.openingTimes.thursday}-${formData.closingTimes.thursday}` : '10:00-22:00'],
      fri: [formData.openingTimes.friday && formData.closingTimes.friday ? `${formData.openingTimes.friday}-${formData.closingTimes.friday}` : '10:00-22:00'],
      sat: [formData.openingTimes.saturday && formData.closingTimes.saturday ? `${formData.openingTimes.saturday}-${formData.closingTimes.saturday}` : '10:00-23:00'],
      sun: [formData.openingTimes.sunday && formData.closingTimes.sunday ? `${formData.openingTimes.sunday}-${formData.closingTimes.sunday}` : '10:00-23:00'],
    },
    adSettings: {
      isTopAd: formData.topAdd,
      isCarousalAd: formData.carouselAdd,
      hasHalal: formData.halalAvailability === 'Yes',
    },
    videoUrl: videoUrl || 'https://example.com/video.mp4',
  };

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 8) {
      alert('You can only upload up to 8 images');
      return;
    }
    
    const newImages = [...formData.images, ...files];
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSpecialtyToggle = (specialty) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      }
      return [...prev, specialty];
    });
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({ ...prev, category }));
    if (category === 'Restaurant with Liquor' || category === 'Liquor Shops') {
      setShowLiquorWarning(true);
    } else {
      setShowLiquorWarning(false);
    }
  };

  const handleDistrictChange = (district) => {
    setFormData(prev => ({ 
      ...prev, 
      district,
      city: '' // Reset city when district changes
    }));
  };

  useEffect(() => {
    let basePrice = 1000; // Base price
    if (formData.category === 'Dansal') {
      basePrice = 0; // Free for dansal
    } else if (formData.category === 'Sri Lankan Worldwide Restaurant') {
      basePrice = 2000; // Higher base price for worldwide
      if (formData.carouselAdd) basePrice += 1000; // Higher add-on prices
      if (formData.topAdd) basePrice += 600;
    } else {
      // Regular pricing for other categories
      if (formData.carouselAdd) basePrice += 500;
      if (formData.topAdd) basePrice += 300;
    }
    setTotalPrice(basePrice);
  }, [formData.carouselAdd, formData.topAdd, formData.category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      // Log the JSON output for user to see
      console.log('Ad JSON to be sent:', adData);

      const form = new FormData();
      form.append('data', JSON.stringify(adData));
      formData.images.forEach((img) => {
        form.append('images', img);
      });
      if (couponCode) {
        form.append('coupon_code', couponCode);
      }
      const token = localStorage.getItem('access_token') || localStorage.getItem('admin_token');
      const res = await fetch('https://kochchibazaar.lk/api/ads/create', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });
      if (!res.ok) throw new Error('Failed to create ad');
      const responseData = await res.json();
      console.log('API response:', responseData);
      setSuccess('Ad posted successfully!');
      // Optionally reset form here
    } catch (err) {
      setError(err.message || 'Error posting ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24 ${poppins.className}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Form Section */}
        <motion.div 
          className="p-6 md:p-10 lg:p-12"
          variants={containerVariants}
        >
          <motion.h1 className="text-4xl font-bold text-gray-900 mb-2" variants={itemVariants}>
            Add Your Business
          </motion.h1>
          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            Let's get your business listed on Kochchibazaar
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <label className="block text-xs font-medium text-gray-500 mb-1">SELECT CATEGORY*</label>
              <select
                required
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </motion.div>

            {/* Liquor Warning */}
            {showLiquorWarning && (
              <motion.div 
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please be advised that selling liquor requires the appropriate licenses as mandated by local, state, and federal laws. Our website and company are not responsible for ensuring that individuals or businesses have the necessary licenses to sell liquor. It is the sole responsibility of the seller to comply with all applicable regulations. Failure to obtain the required licenses may result in legal consequences. We strongly recommend consulting with legal professionals to ensure compliance with all relevant laws.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Basic Information */}
            <motion.div className="space-y-4" variants={itemVariants}>
              {formData.category === 'Dansal' ? (
                // Dansal Layout
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">DANSAL NAME*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.restaurantName}
                      onChange={(e) => setFormData(prev => ({ ...prev, restaurantName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">DISTRICT*</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">CITY*</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    >
                      <option value="">Select City</option>
                      {cities[formData.district]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : formData.category === 'Sri Lankan Worldwide Restaurant' ? (
                // Worldwide Restaurant Layout
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">HOTEL CHAIN NAME*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.restaurantName}
                      onChange={(e) => setFormData(prev => ({ ...prev, restaurantName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">COUNTRY*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.country || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">STATE/PROVINCE/DISTRICT*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.state || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">CITY*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                </div>
              ) : (
                // Regular Restaurant Layout
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">RESTAURANT NAME*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.restaurantName}
                      onChange={(e) => setFormData(prev => ({ ...prev, restaurantName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">ADDRESS*</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Information */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">MOBILE NUMBER*</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">WHATSAPP</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">EMAIL</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">WEBSITE</label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location Information */}
            {formData.category !== 'Dansal' && formData.category !== 'Sri Lankan Worldwide Restaurant' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">GOOGLE MAP LOCATION*</label>
                    <div className="w-full h-64 rounded-xl overflow-hidden border mb-2">
                      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="text-xs text-gray-700 mt-1">
                      Click on the map or drag the marker to select your location.<br />
                      <span className="font-semibold">Selected Coordinates:</span> {selectedCoords.lat.toFixed(6)}, {selectedCoords.lng.toFixed(6)}
                    </div>
                    <input
                      type="hidden"
                      value={formData.googleMapLocation}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">DISTRICT*</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">CITY*</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    >
                      <option value="">Select City</option>
                      {cities[formData.district]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">HALAL AVAILABILITY*</label>
                    <select
                      required
                      className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                      value={formData.halalAvailability}
                      onChange={(e) => setFormData(prev => ({ ...prev, halalAvailability: e.target.value }))}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Opening Hours */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900">Opening Hours</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{day} OPENING TIME*</label>
                      <select
                        required
                        className="w-full px-2 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-sm"
                        value={formData.openingTimes[day]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          openingTimes: { ...prev.openingTimes, [day]: e.target.value }
                        }))}
                      >
                        <option value="">Time</option>
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Closing Hours */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900">Closing Hours</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="space-y-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{day} CLOSING TIME*</label>
                      <select
                        required
                        className="w-full px-2 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 text-sm"
                        value={formData.closingTimes[day]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          closingTimes: { ...prev.closingTimes, [day]: e.target.value }
                        }))}
                      >
                        <option value="">Time</option>
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-500 mb-1">DESCRIPTION*</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </motion.div>
            )}

            {/* Image Upload and Preview */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-500 mb-1">ADD IMAGES (MAX 8)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
                />
                <p className="text-sm text-gray-500">
                  {formData.images.length} images uploaded (Max 8)
                </p>
                
                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Specialties Selection (for Restaurants) */}
            {formData.category === 'Restaurant' && (
              <motion.div className="space-y-4" variants={itemVariants}>
                <label className="block text-xs font-medium text-gray-500 mb-1">SELECT SPECIALTIES</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {specialties.map(specialty => (
                    <div key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        id={specialty}
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => handleSpecialtyToggle(specialty)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={specialty} className="ml-2 block text-sm text-gray-700">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Optional Add-ons with Creative Design */}
            {formData.category !== 'Dansal' && (
              <motion.div className="space-y-6" variants={itemVariants}>
                <h3 className="text-lg font-semibold text-gray-900">Premium Add-ons <small  className="text-xs text-gr
                ay-700">   (Optional)</small></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Carousel Add - Premium Option */}
                  <motion.div 
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      formData.carouselAdd 
                        ? 'border-amber-600 bg-amber-50' 
                        : 'border-gray-200 bg-white hover:border-amber-400'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, carouselAdd: !prev.carouselAdd }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${formData.carouselAdd ? 'bg-amber-600' : 'bg-gray-100'}`}>
                          <FaImages className={`text-xl ${formData.carouselAdd ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Carousel Add</h4>
                          <p className="text-2xl font-bold text-amber-600">
                            Rs. {formData.category === 'Sri Lankan Worldwide Restaurant' ? '1000' : '500'}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.carouselAdd}
                        onChange={() => setFormData(prev => ({ ...prev, carouselAdd: !prev.carouselAdd }))}
                        className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="space-y-2">
                     
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Featured at the top of the front page</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Higher click-through rate</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>More attractive display to customers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Rotating banner placement</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Top Add - Standard Option */}
                  <motion.div 
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      formData.topAdd 
                        ? 'border-slate-700 bg-slate-50' 
                        : 'border-gray-200 bg-white hover:border-slate-500'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, topAdd: !prev.topAdd }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${formData.topAdd ? 'bg-slate-700' : 'bg-gray-100'}`}>
                          <FaArrowUp className={`text-xl ${formData.topAdd ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Top Add</h4>
                          <p className="text-2xl font-bold text-slate-700">
                            Rs. {formData.category === 'Sri Lankan Worldwide Restaurant' ? '600' : '300'}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.topAdd}
                        onChange={() => setFormData(prev => ({ ...prev, topAdd: !prev.topAdd }))}
                        className="h-5 w-5 text-slate-700 focus:ring-slate-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Display at the front of the page</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Priority placement in search results</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-emerald-600" />
                        <span>Increased visibility to customers</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Total Price */}
            <motion.div 
              className={`p-6 rounded-xl border ${
                formData.category === 'Dansal' 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-gradient-to-r from-slate-50 to-amber-50 border-slate-300'
              }`}
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaStar className={`text-xl ${
                    formData.category === 'Dansal' ? 'text-emerald-600' : 'text-amber-600'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-900">Total Price</h3>
                </div>
                <p className={`text-3xl font-bold ${
                  formData.category === 'Dansal' ? 'text-emerald-700' : 'text-slate-800'
                }`}>
                  {formData.category === 'Dansal' ? 'FREE' : `Rs. ${totalPrice}`}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {formData.category === 'Dansal' 
                  ? "Thank you for your charitable contribution! Dansal listings are free to support community service."
                  : formData.topAdd && formData.carouselAdd 
                  ? "You've selected both premium add-ons for maximum visibility!"
                  : formData.topAdd || formData.carouselAdd
                  ? "Great choice! Your business will stand out from the crowd."
                  : "Add premium features to boost your business visibility."
                }
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.button 
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold mb-4"
              variants={itemVariants}
              whileHover={{ scale: 1.02, backgroundColor: "#333" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </motion.button>
            {success && <div className="text-green-600 text-center font-semibold mb-2">{success}</div>}
            {error && <div className="text-red-600 text-center font-semibold mb-2">{error}</div>}
          </form>

          {/* JSON Preview Section */}
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Live JSON Preview</h2>
            <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap break-all overflow-x-auto max-h-96">
              {JSON.stringify(adData, null, 2)}
            </pre>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Page;
