const mockUsers = [
    {
      id: '1',
      username: 'TechExplorer',
      avatarUrl: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
    },
    {
      id: '2',
      username: 'BugHunter',
      avatarUrl: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
    }
  ];
  
  export const mockReports = [
    {
      id: '1',
      title: 'Login page not working on mobile devices',
      content: 'When trying to log in using my iPhone, the submit button appears to be unresponsive. This occurs consistently across different browsers.',
      category: 'bug',
      createdAt: new Date('2024-03-10T08:30:00'),
      author: mockUsers[0],
      votes: {
        upvotes: 25,
        downvotes: 2,
        userVote: null
      },
      flags: 0,
      flaggedByUser: false,
      blockedByUser: false,
      commentCount: 8
    },
    {
      id: '2',
      title: 'Inappropriate content in user profiles',
      content: 'Several user profiles contain inappropriate content that violates community guidelines. This needs immediate attention.',
      category: 'inappropriate_content',
      createdAt: new Date('2024-03-09T15:45:00'),
      author: mockUsers[1],
      votes: {
        upvotes: 42,
        downvotes: 5,
        userVote: null
      },
      flags: 12,
      flaggedByUser: false,
      blockedByUser: false,
      commentCount: 15
    }
  ];
  
  export const categoryLabels = {
    bug: 'Bug Report',
    inappropriate_content: 'Inappropriate Content',
    harassment: 'Harassment',
    misinformation: 'Misinformation',
    other: 'Other'
  };