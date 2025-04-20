import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Flag, ThumbsUp, ThumbsDown, MessageSquare, Ban } from 'lucide-react';

function ReportCard({ report }) {
  const [votes, setVotes] = useState(report.votes);
  const [isFlagged, setIsFlagged] = useState(report.flaggedByUser);
  const [isBlocked, setIsBlocked] = useState(report.blockedByUser);

  const handleVote = (type) => {
    setVotes(prev => {
      const newVote = prev.userVote === type ? null : type;
      return {
        ...prev,
        upvotes: prev.upvotes + (type === 'up' ? (newVote ? 1 : -1) : 0),
        downvotes: prev.downvotes + (type === 'down' ? (newVote ? 1 : -1) : 0),
        userVote: newVote
      };
    });
  };

  const handleFlag = () => setIsFlagged(!isFlagged);
  const handleBlock = () => setIsBlocked(!isBlocked);

  if (isBlocked) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-neutral-200">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-primary-100 ${
              votes.userVote === 'up' ? 'text-primary-500' : 'text-neutral-500'
            }`}
          >
            <ThumbsUp size={20} />
          </button>
          <span className="text-sm font-medium">
            {votes.upvotes - votes.downvotes}
          </span>
          <button
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-primary-100 ${
              votes.userVote === 'down' ? 'text-primary-500' : 'text-neutral-500'
            }`}
          >
            <ThumbsDown size={20} />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={report.author.avatarUrl}
              alt={report.author.username}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-neutral-600">
              Posted by {report.author.username}
            </span>
            <span className="text-sm text-neutral-500">
              • {formatDistanceToNow(report.createdAt)} ago
            </span>
          </div>

          <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 mb-2">
            {report.category}
          </span>
          <p className="text-neutral-700 mb-4">{report.content}</p>

          <div className="flex items-center gap-4 text-neutral-500">
            <button className="flex items-center gap-1 hover:text-primary-500">
              <MessageSquare size={18} />
              <span className="text-sm">{report.commentCount} Comments</span>
            </button>
            <button
              onClick={handleFlag}
              className={`flex items-center gap-1 hover:text-primary-500 ${
                isFlagged ? 'text-primary-500' : ''
              }`}
            >
              <Flag size={18} />
              <span className="text-sm">Flag</span>
            </button>
            <button
              onClick={handleBlock}
              className="flex items-center gap-1 hover:text-primary-500"
            >
              <Ban size={18} />
              <span className="text-sm">Block</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReportCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string
    }).isRequired,
    votes: PropTypes.shape({
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      userVote: PropTypes.oneOf(['up', 'down', null])
    }).isRequired,
    flags: PropTypes.number.isRequired,
    flaggedByUser: PropTypes.bool.isRequired,
    blockedByUser: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired
  }).isRequired
};

export default ReportCard;