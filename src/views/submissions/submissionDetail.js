import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import api from '../../api';
import SubmissionItem from '../../components/submissionItem';
import CommentItem from "../../components/commentItem";

const SubmissionDetail = () => {
  const { id } = useParams();
  const { apiKey } = useContext(ApiKeyContext);
  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await api.get(`api/submissions/${id}/`, {
          headers: {
            'Authorization': apiKey,
          },
        });
        setSubmission(response.data);
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await api.get(`api/comments_tree/?origen=Submission&origin_id=${id}`, {
          headers: {
            'Authorization': apiKey,
          },
        });
        setComments(response.data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchSubmission();
    fetchComments();
  }, [apiKey, id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`api/comments/?origen=Submission&origin_id=${id}`, {
        text: commentText,
      }, {
        headers: {
          'Authorization': apiKey,
        },
      });
      setCommentText('');
      // Re-fetch comments after adding a new one
      const response = await api.get(`api/comments_tree/?origen=Submission&origin_id=${id}`, {
        headers: {
          'Authorization': apiKey,
        },
      });
      setComments(response.data || []);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = (commentId) => {
    const deleteCommentRecursively = (comments, commentId) => {
      return comments.filter(comment => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies) {
          comment.replies = deleteCommentRecursively(comment.replies, commentId);
        }
        return true;
      });
    };

    setComments(deleteCommentRecursively(comments, commentId));
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: comment.parent_comment ? '20px' : '0px' }}>
        <CommentItem
          comment={comment}
          onVote={() => {}}
          onUnvote={() => {}}
          onFavorite={() => {}}
          onUnfavorite={() => {}}
          onDelete={handleDeleteComment}
        />
        <Link to={`/comment/${comment.id}`} style={{ marginLeft: '25px', cursor: 'pointer', textDecoration: 'underline', color: '#5a5a5a', fontSize: '10px' }}>
          reply
        </Link>
        <br/>
        <br/>
        {comment.replies && comment.replies.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ));
  };

  if (!submission) {
    return <div>Loading...</div>;
  }

  return (
    <center>
      <table width="85%" bgcolor="#f6f6ef">
        <tbody>
          <tr id="pagespace" title="" style={{ height: '10px' }}></tr>
          <tr>
            <td>
              <table className="fatitem" border="0">
                <tbody>
                  <tr>
                    <td colSpan="2"></td>
                    <td className="title">
                      <span className="titleline">
                        <SubmissionItem
                          submission={submission}
                          rank={null} // Puedes ajustar el rank según sea necesario
                          onVote={() => {}}
                          onUnvote={() => {}}
                          onHide={() => {}}
                          onUnhide={() => {}}
                          onFavorite={() => {}}
                          onUnfavorite={() => {}}
                          onDelete={() => {}}
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td>
                      <form onSubmit={handleCommentSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          rows="8"
                          cols="80"
                          style={{marginLeft: '32px'}} // Ajusta el valor según sea necesario
                        />
                        <br/>
                        <button type="submit" style={{marginLeft: '32px'}}>add comment</button>
                      </form>
                    </td>
                  </tr>
                  <tr>
                    <td style={{height: '10px'}}></td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td>
                      <table border="0" className="comment-tree">
                        <tbody>
                          {renderComments(comments)}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  );
};

export default SubmissionDetail;