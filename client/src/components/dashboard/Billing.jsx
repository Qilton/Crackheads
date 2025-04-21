import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportCard from './ReportCard';
import ReportFormModal from './ReportFormModal';
import { useCommunity } from '../../provider/CommunityProvider';

function App() {
  const { selectedCommunity } = useCommunity();
  const communityId = selectedCommunity?.communityId;

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchReports = async () => {
      if (!communityId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://crackheads-three.vercel.app/reports/${communityId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          setReports(response.data.reports);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, [communityId]);

  useEffect(() => {
    if (filterType === 'All') {
      setFilteredReports(reports);
    } else {
      setFilteredReports(reports.filter((report) => report.type === filterType));
    }
  }, [filterType, reports]);

  const addReport = (newReport) => {
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    if (filterType === 'All' || newReport.type === filterType) {
      setFilteredReports([newReport, ...filteredReports]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-teal-600 text-white py-2 px-4 rounded"
          >
            Add Report
          </button>

          <select
            className="ml-4 border border-gray-300 rounded px-3 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Security">Security</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          ) : (
            <p className="text-center text-gray-500">No reports found.</p>
          )}
        </div>
      </div>

      <ReportFormModal isOpen={isOpen} setIsOpen={setIsOpen} addReport={addReport} />
    </div>
  );
}

export default App;
