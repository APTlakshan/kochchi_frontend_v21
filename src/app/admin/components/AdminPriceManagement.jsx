import React from 'react';
import { FaUsers, FaPlus, FaTrash, FaLock } from 'react-icons/fa';

function AdminPriceManagement({
  newSubAdmin,
  prices,
  handleAddSubAdmin,
  setNewSubAdmin,
  setPrices,
  adminList,
  userRole = 'sub_admin'
}) {
  if (userRole !== 'super_admin') {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin & Price Management</h2>
          <p className="text-gray-600 text-sm sm:text-base">Manage sub-administrators and set pricing for different ad types</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-red-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600 mb-4">
            Only Super Administrators can access the Admin & Price Management section.
          </p>
          <p className="text-sm text-gray-500">
            Contact your Super Administrator if you need access to this functionality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin & Price Management</h2>
        <p className="text-gray-600 text-sm sm:text-base">Manage sub-administrators and set pricing for different ad types</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Sub-admin management */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Sub-administrators</h3>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FaUsers className="text-blue-600 text-base sm:text-lg" />
            </div>
          </div>
          <div className="space-y-4 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.username || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, username: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter sub-admin email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.email || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, email: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.first_name || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, first_name: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.last_name || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, last_name: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.phone_number || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, phone_number: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                  value={newSubAdmin.password || ''}
                  onChange={e => setNewSubAdmin({ ...newSubAdmin, password: e.target.value })}
                  style={{ minHeight: 40 }}
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={handleAddSubAdmin} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 mt-2 text-sm sm:text-base"
            >
              <FaPlus /> Add Sub-admin
            </button>
          </div>
          {/* Admins List */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base mb-2">All Admins</h4>
            {adminList && adminList.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl shadow-sm border border-blue-100 bg-white">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-blue-700">Admin</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-700">Email</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-700">Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList.map((admin, idx) => {
                      // Generate initials
                      const initials = (admin.first_name && admin.last_name)
                        ? `${admin.first_name[0]}${admin.last_name[0]}`.toUpperCase()
                        : (admin.username ? admin.username.slice(0, 2).toUpperCase() : 'AD');
                      // Color palette for avatars
                      const colors = ["bg-blue-500", "bg-green-500", "bg-pink-500", "bg-yellow-500", "bg-purple-500", "bg-indigo-500"];
                      const color = colors[idx % colors.length];
                      return (
                        <tr
                          key={admin.id || idx}
                          className={
                            `transition-colors ${idx % 2 === 0 ? 'bg-blue-50/40' : 'bg-white'} hover:bg-blue-100/60`
                          }
                        >
                          <td className="px-4 py-3 flex items-center gap-3 font-medium text-gray-900">
                            <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-base shadow ${color}`}>{initials}</span>
                            <span>{admin.username}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{admin.email}</td>
                          <td className="px-4 py-3 text-gray-600">{admin.last_login ? new Date(admin.last_login).toLocaleString() : <span className="italic text-gray-400">Never</span>}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-500 text-sm">No admins found.</div>
            )}
          </div>
        </div>
        {/* Price management */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Ad Pricing</h3>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-base sm:text-lg">$</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'base_price', label: 'Normal Ad' },
              { key: 'top_add_price', label: 'Top Ad' },
              { key: 'carosal_add_price', label: 'Carousel Ad' }
            ].map(({ key, label }) => (
              <div key={key} className="p-4 border rounded-xl space-y-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-800 text-base">{label}</h4>
                
                <div className="flex flex-col gap-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input 
                      type="number" 
                      className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base font-medium" 
                      placeholder="Enter price" 
                      value={prices[key]?.price || ''} 
                      onChange={e => {
                        const { value } = e.target;
                        setPrices(p => ({ ...p, [key]: { ...p[key], price: value }}));
                      }}
                      style={{ minHeight: 40 }}
                    />
                  </div>
                </div>

                <div>
                    <h5 className="font-medium text-gray-700 mb-3 text-sm">Discount</h5>
                    <div className="space-y-3">
                        <div className="flex flex-col gap-1">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700">Discount %</label>
                          <input
                            type="number"
                            placeholder="e.g., 10"
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                            value={prices[key]?.discount_applied?.value_percent || ''}
                            onChange={e => {
                                const { value } = e.target;
                                setPrices(p => ({ ...p, [key]: { ...p[key], discount_applied: { ...p[key]?.discount_applied, value_percent: value } }}));
                            }}
                            style={{ minHeight: 40 }}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="block text-xs sm:text-sm font-medium text-gray-700">Start Date</label>
                              <input
                                type="date"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                                value={prices[key]?.discount_applied?.start_date || ''}
                                 onChange={e => {
                                    const { value } = e.target;
                                    setPrices(p => ({ ...p, [key]: { ...p[key], discount_applied: { ...p[key]?.discount_applied, start_date: value } }}));
                                }}
                                style={{ minHeight: 40 }}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="block text-xs sm:text-sm font-medium text-gray-700">End Date</label>
                              <input
                                type="date"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
                                value={prices[key]?.discount_applied?.end_date || ''}
                                onChange={e => {
                                    const { value } = e.target;
                                    setPrices(p => ({ ...p, [key]: { ...p[key], discount_applied: { ...p[key]?.discount_applied, end_date: value } }}));
                                }}
                                style={{ minHeight: 40 }}
                              />
                            </div>
                        </div>
                    </div>
                </div>

              </div>
            ))}
            <button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-colors mt-2 text-sm sm:text-base">
              Update Prices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPriceManagement; 