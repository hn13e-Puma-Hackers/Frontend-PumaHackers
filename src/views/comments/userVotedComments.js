import React, { useContext, useEffect, useState } from 'react';
import api from '../../api';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import CommentItem from '../../components/commentItem';

const UserVotedComments = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get('/api/upvoted_comments/', {
          headers: {
            'Authorization': apiKey,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching upvoted comments:', error);
      }
    };

    fetchComments();
  }, [apiKey]);

  const handleVote = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, votes: comment.votes + 1, voted: true } : comment
    ));
  };

  const handleUnvote = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, votes: comment.votes - 1, voted: false } : comment
    ));
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <center>
      <table width="85%" bgcolor="#f6f6ef">
        <tbody>
          {/* Spacer */}
          <tr id="pagespace" title="" style={{ height: '10px' }}></tr>

          {/* Comment Items */}
          <tr>
            <td>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onVote={handleVote}
                      onUnvote={handleUnvote}
                      onFavorite={() => {}}
                      onUnfavorite={() => {}}
                      onDelete={handleDeleteComment}
                    />
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
};

export default UserVotedComments;