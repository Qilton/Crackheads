import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportCard from './ReportCard';
import ReportFormModal from './ReportFormModal';
import { useCommunity } from '../../provider/CommunityProvider';

function App() {
  const { selectedCommunity } = useCommunity();
  const communityId = selectedCommunity.communityId;
  const [reports, setReports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      if (!communityId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/reports/${communityId}`, {
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

  const addReport = (newReport) => {
    setReports((prevReports) => [newReport, ...prevReports]); // Add new report to the front of the array
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setIsOpen(true)} className="bg-teal-600 text-white py-2 px-4 rounded">
          Add Report
        </button>

        <div className="space-y-4 mt-8">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      <ReportFormModal isOpen={isOpen} setIsOpen={setIsOpen} addReport={addReport} />
    </div>
  );
}

export default App;
