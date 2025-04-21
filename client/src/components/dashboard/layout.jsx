import React, { useState } from 'react';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
export const Layout = ({ children, activePage, setActivePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {activePage}
            </h1>

            <div className="flex items-center space-x-4">
            
              <div className="relative">
                <button className="flex items-center focus:outline-none" onClick={() => navigate('/profile')}>
                  <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    <span className="text-sm font-medium">EJ</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};