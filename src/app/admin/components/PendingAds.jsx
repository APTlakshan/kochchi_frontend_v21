import React from 'react';

function PendingAds({ pendingAds, handleRemovePendingAd }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Pending Ads</h2>
        <p className="text-gray-600 mt-1">Review and manage ads awaiting approval</p>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ad ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shop Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{ad.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.shop}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ad.email}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRemovePendingAd(ad.id)} 
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
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

export default PendingAds; 