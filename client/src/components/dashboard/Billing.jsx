import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { mockReports } from './mockData';
import ReportCard from './ReportCard';

function App() {
  const [sortBy, setSortBy] = useState('newest');
  const [reports, setReports] = useState(mockReports);

  const sortedReports = [...reports].sort((a, b) => {
    switch (sortBy) {
      case 'top':
        return (b.votes.upvotes - b.votes.downvotes) - (a.votes.upvotes - a.votes.downvotes);
      case 'controversial':
        return b.votes.downvotes - a.votes.downvotes;
      case 'newest':
      default:
        return b.createdAt - a.createdAt;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-3xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-primary-500" size={24} />
            <h1 className="text-2xl font-bold text-neutral-900">Report Center</h1>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest</option>
            <option value="top">Top</option>
            <option value="controversial">Controversial</option>
          </select>
        </div>

        <div className="space-y-4">
          {sortedReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;