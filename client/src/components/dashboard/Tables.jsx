import React,{useEffect,useState} from 'react';
import { useCommunity } from '../../provider/CommunityProvider';
import axios from 'axios';  
const Tables = () => {
  const { selectedCommunity } = useCommunity();
  const [members, setMembers] = useState([]);
  console.log("selectedCommunity",selectedCommunity);
  const communityId = selectedCommunity ? selectedCommunity.communityId : null;

 
  useEffect(() => {
    const getMembers = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/community/members/${communityId}`,  {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        console.log(result);
        setMembers(result.data.members); 
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    getMembers(); 
  }, []);

console.log("members",members);
  const authors = [
    { name: 'John Michael', email: 'john@creative-tim.com', role: 'Manager', status: 'Online', date: '23/04/18' },
    { name: 'Alexa Liras', email: 'alexa@creative-tim.com', role: 'Developer', status: 'Offline', date: '11/01/19' },
    { name: 'Laurent Perrier', email: 'laurent@creative-tim.com', role: 'Designer', status: 'Online', date: '19/09/17' },
    { name: 'Michael Levi', email: 'michael@creative-tim.com', role: 'Developer', status: 'Online', date: '24/12/08' },
    { name: 'Richard Gran', email: 'richard@creative-tim.com', role: 'Manager', status: 'Offline', date: '04/10/21' },
    { name: 'Miriam Eric', email: 'miriam@creative-tim.com', role: 'Developer', status: 'Online', date: '14/09/20' },
  ];

  const projects = [
    { name: 'Chakra Soft UI Version', budget: '$14,000', status: 'Working', completion: 60 },
    { name: 'Add Progress Track', budget: '$3,000', status: 'Canceled', completion: 10 },
    { name: 'Fix Platform Errors', budget: 'Not set', status: 'Done', completion: 100 },
    { name: 'Launch our Mobile App', budget: '$32,000', status: 'Done', completion: 100 },
    { name: 'Add the New Pricing Page', budget: '$400', status: 'Working', completion: 25 },
  ];

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
                
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
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
                    <div className="text-sm text-gray-900">{member.role}</div>
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
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