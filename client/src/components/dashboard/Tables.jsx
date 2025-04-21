import React, { useEffect, useState } from 'react';
import { useCommunity } from '../../provider/CommunityProvider';
import axios from 'axios';

const Tables = () => {
  const { selectedCommunity } = useCommunity();
  const [members, setMembers] = useState([]);
  const communityId = selectedCommunity ? selectedCommunity.communityId : null;

  useEffect(() => {
    const getMembers = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/community/members/${communityId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setMembers(result.data.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    getMembers();
  }, [communityId]);
  const rolesEnum = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    MEMBER: 'member',
    MAID: "maid",
    PLUMBER: "plumber",
    ELECTRICIAN: "electrician",
    SECURITY: "security",
    MAINTENANCE: "maintenance",
    GARDENER: 'gardener',
    CLEANER: 'cleaner',
  };

  const handleChangeRole = async (memberId, newRole) => {
    try {
      const result = await axios.post(
        `http://localhost:8080/admin/changerole`,
        {
          userId: memberId,
          communityId: selectedCommunity?.communityId,
          newRole,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );


      setMembers((prev) =>
        prev.map((m) =>
          m._id === memberId ? { ...m, role: newRole } : m
        )
      );

      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error changing role:", error.response?.data || error);
      alert("Failed to change role.");
    }
  };

  const HandleRemove = async (memberId) => {
    const loggedInUserId = localStorage.getItem("id");
  
    // Prevent removal if the user is trying to remove themselves
    if (memberId === loggedInUserId) {
      alert("You cannot remove yourself!");
      return;
    }
  
    try {
      const result = await axios.post(`http://localhost:8080/admin/remove`, { userId: memberId, communityId: selectedCommunity?.communityId }, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setMembers((prevMembers) => prevMembers.filter(member => member._id !== memberId));
      alert("Member removed successfully!");
    } catch (error) {
      console.error("Error removing member:", error);
      alert("Failed to remove member.");
    }
  };
  


  return (
    <div className="space-y-6">
      {/* Authors Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Function
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone No.
                </th>
                {selectedCommunity?.role === 'admin' &&
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                        <div className="h-full w-full rounded-full overflow-hidden">
                          <img
                            src={member.pfp}
                            alt={member.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100';
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {selectedCommunity?.role === 'admin' ? (
                      member._id === `${localStorage.getItem("id")}` ? (
                        <div className="text-sm text-gray-900">{member.role} (You)</div>
                      ) : (
                        <select
                          value={member.role}
                          onChange={(e) => handleChangeRole(member._id, e.target.value)}
                          className="text-sm text-gray-900 border border-gray-300 rounded px-2 py-1"
                        >
                          {Object.values(rolesEnum).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      )
                    ) : (
                      <div className="text-sm text-gray-900">{member.role}</div>
                    )}


                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.phone}</div>
                  </td>
                  {selectedCommunity?.role === 'admin' &&
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => HandleRemove(member._id)} className="text-red-600 hover:text-red-900">Remove</button>
                    </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
