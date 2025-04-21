import React, { useState } from 'react';
import axios from 'axios';
import { useCommunity } from '../../provider/CommunityProvider.jsx';

const ReportFormModal = ({ isOpen, setIsOpen, addReport }) => {
  const { selectedCommunity } = useCommunity(); 
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    type: 'Other',
  });
  const [loading, setLoading] = useState(false);

  const reportTypes = ['Electricity', 'Water', 'Security', 'Maintenance', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:8080/reports/create',
        {
          ...formData,
          communityId: selectedCommunity.communityId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Add the new report to the parent component's state
      addReport(res.data.report);

      alert('Report submitted!');
      setFormData({ heading: '', description: '', type: 'Other' });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Submit Community Report</h2>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2 font-medium">Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />

              <label className="block mb-2 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={4}
                required
              ></textarea>

              <label className="block mb-2 font-medium">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportFormModal;
