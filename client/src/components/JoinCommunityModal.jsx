import { useState } from 'react';
import axios from 'axios';
const JoinCommunityModal = ({ joinModal, setJoinModal }) => {
  const [communityName, setCommunityName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://crackheads-three.vercel.app/community/join', {
        communityName,
        code:roomCode,
      }, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
  
      alert('Joined successfully!');
      setJoinModal(false);
  
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Failed to join community. Please check the room code.');
    }
  };
  

  const handleClose = () => {
    setJoinModal(false);
  };

  return (
    joinModal && (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-80 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>

          <h2 className="text-center text-xl font-semibold mb-4">Join a Community</h2>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Community Name"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              required
            />

            <input
              type="text"
              maxLength="8"
              pattern="[A-Za-z0-9]{8}"
              placeholder="Enter 8-character room code"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Join Community
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default JoinCommunityModal;
