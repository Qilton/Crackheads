import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Flag, ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';

function ReportCard({ report }) {
    const [upvotes, setUpvotes] = useState(report.upvotes || []);
    const [downvotes, setDownvotes] = useState(report.downvotes || []);
    const [isFlagged, setIsFlagged] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [replyTextMap, setReplyTextMap] = useState({});

    const currentUserId = localStorage.getItem('id');

    useEffect(() => {
        if (report.flaggedBy.includes(currentUserId)) {
            setIsFlagged(true);
        }
    
        const fetchComments = async () => {
            try {
                const res = await axios.get(`https://crackheads-three.vercel.app/comment/${report._id}/comments`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
    
                if (res.status === 200) {
                    setComments(res.data.comments); 
                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
    
        fetchComments();
    }, [report._id, currentUserId]);
    
    
    const getUserVote = () => {
        if (upvotes.includes(currentUserId)) return 'up';
        if (downvotes.includes(currentUserId)) return 'down';
        return null;
    };

    const [userVote, setUserVote] = useState(getUserVote());

    useEffect(() => {
        if (upvotes.includes(currentUserId)) {
            setUserVote('up');
        } else if (downvotes.includes(currentUserId)) {
            setUserVote('down');
        } else {
            setUserVote(null);
        }
    }, [upvotes, downvotes, currentUserId]);

    const handleVote = async (type) => {
        const route = type === 'up' ? 'upvote' : 'downvote';

        try {
            const res = await axios.post(
                `https://crackheads-three.vercel.app/reports/${report._id}/${route}`,
                { userId: currentUserId },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.status === 200) {
                const updated = res.data;
                setUpvotes(updated.upvotes || []);
                setDownvotes(updated.downvotes || []);
                setUserVote((prev) => (prev === type ? null : type));
            }
        } catch (err) {
            console.error('Vote error:', err);
        }
    };

    const handleFlag = async () => {
        try {
            const endpoint = isFlagged ? 'unflag' : 'flag';
    
            const res = await axios.post(
                `https://crackheads-three.vercel.app/reports/${report._id}/${endpoint}`,
                { userId: currentUserId },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (res.status === 200) {
                setIsFlagged(!isFlagged);
            }
        } catch (err) {
            console.error(`${isFlagged ? 'Unflag' : 'Flag'} error:`, err);
        }
    };
    

    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        try {
            const res = await axios.post(
                `https://crackheads-three.vercel.app/comment/${report._id}/comments`,
                { text: commentText },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setComments((prev) => [...prev, res.data.comment]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleReply = async (commentId) => {
        const replyText = replyTextMap[commentId];
        if (!replyText?.trim()) return;

        try {
            const res = await axios.post(
                `https://crackheads-three.vercel.app/comment/${commentId}/replies`,
                { text: replyText,parentComment: commentId },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setComments((prev) =>
                prev.map((c) =>
                    c._id === commentId
                        ? { ...c, replies: [...(c.replies || []), res.data.reply] }
                        : c
                )
            );
            setReplyTextMap((prev) => ({ ...prev, [commentId]: '' }));
        } catch (err) {
            console.error('Reply error:', err);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-neutral-200">
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => handleVote('up')}
                        className={`p-1 rounded hover:bg-primary-100 ${userVote === 'up' ? 'text-primary-700' : 'text-neutral-500'}`}
                    >
                        <ThumbsUp size={20} />
                    </button>

                    <span className="text-sm font-medium">
                        {upvotes.length - downvotes.length}
                    </span>

                    <button
                        onClick={() => handleVote('down')}
                        className={`p-1 rounded hover:bg-primary-100 ${userVote === 'down' ? 'text-red-700' : 'text-neutral-500'}`}
                    >
                        <ThumbsDown size={20} />
                    </button>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <img
                            src={report.createdBy.pfp}
                            alt={report.createdBy.name}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-neutral-600">
                            Posted by {report.createdBy.name}
                        </span>
                        <span className="text-sm text-neutral-500">
                            • {formatDistanceToNow(new Date(report.createdAt))} ago
                        </span>
                    </div>

                    <h2 className="text-lg font-semibold mb-2">{report.heading}</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 mb-2">
                        {report.type}
                    </span>
                    <p className="text-neutral-700 mb-4">{report.description}</p>

                    <div className="flex items-center gap-4 text-neutral-500 mb-4">
                        <button
                            className="flex items-center gap-1 hover:text-primary-500"
                            onClick={() => setShowCommentsModal(true)}
                        >
                            <MessageSquare size={18} />
                            <span className="text-sm">{comments.length} Comments</span>
                        </button>
                        <button
                            onClick={handleFlag}
                            className={`flex items-center gap-1 hover:text-primary-500 ${isFlagged ? 'text-red-700' : ''}`}
                        >
                            <Flag size={18} />
                            <span className="text-sm">{isFlagged ? 'Unflag' : 'Flag'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {showCommentsModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => setShowCommentsModal(false)}
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-lg font-semibold mb-4">Comments</h3>

                        <textarea
                            className="w-full border rounded-md p-2"
                            rows={2}
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            className="mt-2 bg-black text-white px-4 py-1 rounded"
                            onClick={handleAddComment}
                        >
                            Add Comment
                        </button>

                        <div className="mt-4">
                            {comments.map((comment) => (
                                <div key={comment._id} className="mb-4 border-l-2 pl-3">
                                    <div className="flex items-center gap-2 mb-1">
                                                {comment.createdBy?.pfp && (
                                                    <img
                                                        src={comment.createdBy.pfp}
                                                        alt={comment.createdBy.name}
                                                        className="w-5 h-5 rounded-full"
                                                    />
                                                )}
                                                <span className="text-sm font-medium text-neutral-700">
                                                    {comment.createdBy?.name || 'Anonymous'}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    • {formatDistanceToNow(new Date(comment.createdAt))} ago
                                                </span>
                                            </div>
                                    <p className="text-sm text-neutral-700">{comment.text}</p>
                                    <div className="text-xs text-neutral-500">
                                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                                    </div>

                                    <textarea
                                        className="w-full border rounded-md p-2 mt-2"
                                        rows={1}
                                        placeholder="Write a reply..."
                                        value={replyTextMap[comment._id] || ''}
                                        onChange={(e) =>
                                            setReplyTextMap((prev) => ({
                                                ...prev,
                                                [comment._id]: e.target.value,
                                            }))
                                        }
                                    />
                                    <button
                                        className="mt-1 text-sm text-white bg-black px-3 py-1 rounded"
                                        onClick={() => handleReply(comment._id)}
                                    >
                                        Reply
                                    </button>

                                    {comment.replies?.map((reply) => (
                                        <div key={reply._id} className="ml-4 mt-2 border-l-2 pl-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                {reply.createdBy?.pfp && (
                                                    <img
                                                        src={reply.createdBy.pfp}
                                                        alt={reply.createdBy.name}
                                                        className="w-5 h-5 rounded-full"
                                                    />
                                                )}
                                                <span className="text-sm font-medium text-neutral-700">
                                                    {reply.createdBy?.name || 'Anonymous'}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    • {formatDistanceToNow(new Date(reply.createdAt))} ago
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-700 ml-7">{reply.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ReportCard.propTypes = {
    report: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        createdBy: PropTypes.shape({
            name: PropTypes.string.isRequired,
            pfp: PropTypes.string,
        }).isRequired,
        upvotes: PropTypes.array.isRequired,
        downvotes: PropTypes.array.isRequired,
        flaggedBy: PropTypes.array.isRequired,
    }).isRequired,
};

export default ReportCard;
