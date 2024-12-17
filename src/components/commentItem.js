import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiKeyContext } from '../context/ApiKeyContext';

const CommentItem = ({ comment, onVote, onUnvote, onFavorite, onUnfavorite }) => {
  const { apiKey, username } = useContext(ApiKeyContext);
  const [submission, setSubmission] = useState(null);
  const user = {
    isAuthenticated: true, // Change according to authentication state
    username: 'anyer',
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/submissions/${comment.submission}/`, {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Readable format
  };

  return (
    <>
      <tr className="athing comtr" id={`comment-${comment.id}`}>
        <td valign="top" className="votelinks">
          <center>
            {user.isAuthenticated && !comment.voted && user.username !== comment.author ? (
              <button
                type="button"
                style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                onClick={() => onVote(comment.id)}
              >
                <div className="votearrow" title="upvote"></div>
              </button>
            ) : (
              <button type="button" className="votearrow" style={{ visibility: 'hidden' }}></button>
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
                  style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                  className="btn-profile"
                >
                  <span className="hnuser">{comment.author}</span>
                </button>
              </Link>{' '}
              <span className="age">{formatDate(comment.created_at)} ago</span>
              {user.isAuthenticated && comment.voted && user.username !== comment.author && (
                <>
                {' '} | {' '}
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                    onClick={() => onUnvote(comment.id)}
                  >
                    unvote
                  </button>
                </>
              )}
              {user.isAuthenticated && (
                <>{' '}
                  | {' '}
                  {comment.favorited ? (
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                      onClick={() => onUnfavorite(comment.id)}
                      className="delete-link"
                    >
                      un-favorite
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', padding: 0, color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                      onClick={() => onFavorite(comment.id)}
                      className="delete-link"
                    >
                      favorite
                    </button>
                  )}
                </>
              )}
              <span className="navs">
                {' '} | {' '}
                <Link to={comment.parent_comment ? `/comment/${comment.parent_comment.id}` : `/submission/${comment.submission}`}>
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