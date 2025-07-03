import React from 'react';
import { FaTrash } from 'react-icons/fa';

function ApprovedAds({ approvedAds, handleRemoveApprovedAd }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Approved Ads</h2>
        <p className="text-gray-600 mt-1">Manage currently active advertisements</p>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ad ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shop Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {approvedAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{ad.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.shop}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleRemoveApprovedAd(ad.id)} 
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ApprovedAds; 