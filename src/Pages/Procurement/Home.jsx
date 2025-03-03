import React, { useState } from 'react';

// Simple custom chart components instead of using recharts
const SimpleBarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.seriesA + item.seriesB));
  
  return (
    <div className="h-64 flex items-end space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className="w-full flex flex-col-reverse">
            <div 
              className="w-full bg-blue-500" 
              style={{ height: `${(item.seriesA / maxValue) * 180}px` }} 
            />
            <div 
              className="w-full bg-gray-200" 
              style={{ height: `${(item.seriesB / maxValue) * 180}px` }} 
            />
          </div>
          <div className="text-xs mt-2 text-gray-600">{item.year}</div>
        </div>
      ))}
    </div>
  );
};

const SimpleLineChart = ({ data }) => {
  // This is a very simplified representation - in a real app you'd want to calculate proper SVG paths
  return (
    <div className="h-64 relative border-b border-l border-gray-200">
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        Line chart visualization (simplified version)
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-gray-600">{item.year}</div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Sample data
  const totalRevenueData = [
    { year: '2005', seriesA: 75, seriesB: 225 },
    { year: '2006', seriesA: 100, seriesB: 150 },
    { year: '2007', seriesA: 90, seriesB: 180 },
    { year: '2008', seriesA: 95, seriesB: 160 },
    { year: '2009', seriesA: 100, seriesB: 170 },
    { year: '2010', seriesA: 85, seriesB: 150 },
    { year: '2011', seriesA: 80, seriesB: 145 },
    { year: '2012', seriesA: 90, seriesB: 140 },
    { year: '2013', seriesA: 75, seriesB: 145 },
    { year: '2014', seriesA: 95, seriesB: 175 },
    { year: '2015', seriesA: 100, seriesB: 185 },
  ];

  const salesAnalyticsData = [
    { year: '2005', mobiles: 25, tablets: 0 },
    { year: '2006', mobiles: 35, tablets: 15 },
    { year: '2007', mobiles: 30, tablets: 25 },
    { year: '2008', mobiles: 40, tablets: 35 },
    { year: '2009', mobiles: 65, tablets: 40 },
    { year: '2010', mobiles: 35, tablets: 65 },
    { year: '2011', mobiles: 50, tablets: 35 },
    { year: '2012', mobiles: 75, tablets: 25 },
    { year: '2013', mobiles: 60, tablets: 45 },
    { year: '2014', mobiles: 70, tablets: 65 },
    { year: '2015', mobiles: 90, tablets: 75 },
  ];

  const contactsData = [
    { id: 1, name: 'Tomatoes', email: 'tomatoes@dummy.com', products: 356, startDate: '01/11/2003', avatar: '/api/placeholder/32/32' },
    { id: 2, name: 'Chademgle', email: 'chademgle@dummy.com', products: 568, startDate: '01/11/2003', avatar: '/api/placeholder/32/32' },
    { id: 3, name: 'Spillnotdavid', email: 'spillnotdavid@dummy.com', products: 201, startDate: '12/11/2003', avatar: '/api/placeholder/32/32' },
    { id: 4, name: 'Kurafire', email: 'kurafire@dummy.com', products: 56, startDate: '14/11/2003', avatar: '/api/placeholder/32/32' },
    { id: 5, name: 'Shahodk', email: 'shahodk@dummy.com', products: 356, startDate: '20/11/2003', avatar: '/api/placeholder/32/32' },
    { id: 6, name: 'Adhamadnaviawy', email: 'adhamadnaviawy@dummy.com', products: 956, startDate: '24/11/2003', avatar: '/api/placeholder/32/32' },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: 'grid-2x2', badge: null },
    { name: 'UI Elements', icon: 'layout', badge: 14 },
    { name: 'Components', icon: 'puzzle', badge: null, hasChildren: true },
    { name: 'Typography', icon: 'type', badge: null },
    { name: 'Forms', icon: 'clipboard', badge: null, hasChildren: true },
    { name: 'Tables', icon: 'table', badge: null, hasChildren: true },
    { name: 'Charts', icon: 'bar-chart-2', badge: 3 },
    { name: 'Maps', icon: 'map', badge: null },
    { name: 'Pages', icon: 'file', badge: null, hasChildren: true },
    { name: 'Extra Pages', icon: 'file-plus', badge: null, hasChildren: true },
    { name: 'Multi Level', icon: 'layers', badge: null, hasChildren: true },
  ];

  return (
    <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-500 text-2xl">8954</span>
                <span className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
              </div>
              <p className="text-gray-500 text-sm">Lifetime total sales</p>
            </div>
            
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-500 text-2xl">7841</span>
                <span className="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <p className="text-gray-500 text-sm">Income amounts</p>
            </div>
            
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 text-2xl">6521</span>
                <span className="text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <p className="text-gray-500 text-sm">Total users</p>
            </div>
            
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-400 text-2xl">325</span>
                <span className="text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </div>
              <p className="text-gray-500 text-sm">Total visits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Total Revenue Chart */}
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <h2 className="text-lg font-medium mb-6">Total Revenue</h2>
              <div className="flex justify-center mb-4">
                <div className="flex items-center mr-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Series A</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-sm text-gray-600">Series B</span>
                </div>
              </div>
              <SimpleBarChart data={totalRevenueData} />
            </div>

            {/* Sales Analytics Chart */}
            <div className="bg-white rounded-md p-6 border border-gray-200">
              <h2 className="text-lg font-medium mb-6">Sales Analytics</h2>
              <div className="flex justify-center mb-4">
                <div className="flex items-center mr-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Mobiles</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Tablets</span>
                </div>
              </div>
              <SimpleLineChart data={salesAnalyticsData} />
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-md p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-6">Contacts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contactsData.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                            <img src="https://via.placeholder.com/32" alt={contact.name} className="h-8 w-8" />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{contact.products}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{contact.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

     </div>
     
  );
};

export default Dashboard;