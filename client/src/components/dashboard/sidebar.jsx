import React from 'react';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Community Stats', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Members', icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { name: 'Report', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
   
  ];

  

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <div className="flex items-center space-x-2">
            <span onClick={()=>navigate("/home")} className="pl-4 text-lg font-semibold text-gray-800 cursor-pointer">SafeCircle</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden text-gray-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="py-4 px-4 space-y-8">
          {/* Main navigation */}
          <div>
            <div className="mb-3">
              <div className="flex items-center space-x-2 opacity-80">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <span className="text-xs font-semibold uppercase text-gray-500">Main</span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activePage === item.name
                      ? 'bg-[#4aff01] text-black'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <svg 
                    className="mr-3 h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="capitalize">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

      

          {/* Help section */}
          <div className="bg-teal-50 rounded-xl p-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Need help?</h3>
              <p className="text-xs text-gray-600 mb-3">Please check our docs</p>
              <button className="w-full px-4 py-2 text-xs font-medium text-teal-600 bg-white rounded-lg border border-teal-200 hover:bg-teal-500 hover:text-white transition-colors duration-200">
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;