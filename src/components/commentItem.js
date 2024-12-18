import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiKeyContext } from '../context/ApiKeyContext';
import api from "../api";

const CommentItem = ({ comment, onVote, onUnvote, onFavorite, onUnfavorite, onDelete }) => {
  const { apiKey, username } = useContext(ApiKeyContext);
  const [submission, setSubmission] = useState(null);
  const [voted, setVoted] = useState(comment.voted);
  const [favorited, setFavorited] = useState(comment.favorited);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await api.get(`/api/submissions/${comment.submission}/`, {
          headers: {
            'Authorization': apiKey,
          },
        });
        setSubmission(response.data);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    fetchSubmission();
  }, [apiKey, comment.submission]);

  const handleActionPatch = async (commentId, url) => {
    try {
      const response = await api.patch(
        `/api/comments/${commentId}/${url}/`,
        {},
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      console.log(`${url} successful:`, response.data);

      if (url === 'favorite') {
        setFavorited(true);
        onFavorite(commentId);
      } else if (url === 'unfavorite') {
        setFavorited(false);
        onUnfavorite(commentId);
      } else if (url === 'vote') {
        setVoted(true);
        onVote(commentId);
      } else if (url === 'unvote') {
        setVoted(false);
        onUnvote(commentId);
      }
    } catch (error) {
      console.error(`Error performing action ${url}:`, error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await api.delete(`/api/comments/${commentId}/`, {
        headers: {
          Authorization: apiKey,
        },
      });
      console.log('Delete successful:', response.data);
      onDelete(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Readable format
  };

  return (
    <>
      <tr className="athing comtr" id={`comment-${comment.id}`}>
        <td valign="top" className="votelinks">
          <center>
            {!voted && username !== comment.author ? (
              <button
                className="votearrow"
                title="upvote"
                style={{ cursor: 'pointer' }}
                onClick={() => handleActionPatch(comment.id, 'vote')}
              ></button>
            ) : (
              <button
                type="button"
                className="votearrow"
                style={{ visibility: 'hidden' }}
              ></button>
            )}
          </center>
        </td>
        <td className="default">
          <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
            <span className="comhead">
              {comment.votes} points by{' '}
              <Link to={`/profile/${comment.author}`}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'gray',
                    cursor: 'pointer',
                    fontSize: 'inherit'
                  }}
                  className="btn-profile"
                >
                  <span className="hnuser">{comment.author}</span>
                </button>
              </Link>{' '}
              <span className="age">{formatDate(comment.created_at)} ago</span>
              {username && voted && username !== comment.author && (
                <>
                  {' '} | {' '}
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                    onClick={() => handleActionPatch(comment.id, 'unvote')}
                  >
                    unvote
                  </button>
                </>
              )}
              {username && (
                <>{' '}
                  | {' '}
                  {favorited ? (
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                      onClick={() => handleActionPatch(comment.id, 'unfavorite')}
                      className="delete-link"
                    >
                      un-favorite
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                      onClick={() => handleActionPatch(comment.id, 'favorite')}
                      className="delete-link"
                    >
                      favorite
                    </button>
                  )}
                </>
              )}
              {username && comment.author === username && (
              <>{' '} | {' '}
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                  onClick={() => handleDelete(comment.id)}
                >
                  delete
                </button>
              </>
                )}
              <span className="navs">
                {' '} | {' '}
                <Link to={comment.parent_comment ? `/comment/${comment.parent_comment}` : `/submissions/${comment.submission}`}>
                  parent
                </Link>
                {submission && (
                  <span className="onstory">
                    {' '}
                    | on: {' '}
                    <Link to={`/submission/${submission.id}`} rel="nofollow">
                      {submission.title}
                    </Link>
                  </span>
                )}
              </span>
            </span>
          </div>
          <br />
          <div className="comment">
            <div className="commtext c00">{comment.text}</div>
            <div className="reply"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ height: '10px' }}></td>
      </tr>
    </>
  );
};

export default CommentItem;