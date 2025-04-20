import React, { useState } from 'react';
import { Layout } from '../components/dashboard/layout';
import Dashboard from '../components/dashboard/Dashboard';
import Tables from '../components/dashboard/Tables';
import Billing from '../components/dashboard/Billing';

function App() {
  const [activePage, setActivePage] = useState('Community Stats');

  // Render the active page based on state
  const renderPage = () => {
    switch (activePage) {
      case 'Community Stats':
        return <Dashboard />;
      case 'Members':
        return <Tables />;
      case 'Report':
        return <Billing />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;