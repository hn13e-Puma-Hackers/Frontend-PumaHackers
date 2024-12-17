import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import axios from 'axios';
import SubmissionItem from '../../components/submissionItem';

const SubmissionDetail = () => {
  const { id } = useParams();
  const { apiKey } = useContext(ApiKeyContext);
  const [submission, setSubmission] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/submissions/${id}/`, {
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
        const response = await axios.get(`http://127.0.0.1:8000/api/comments_tree/?origen=Submission&origin_id=${id}`, {
          headers: {
            'Authorization': apiKey,
          },
        });
        setComments(response.data.comments || []);
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
      await axios.post(`http://127.0.0.1:8000/api/comments/?origen=Submission&origin_id=${id}`, {
        text: commentText,
      }, {
        headers: {
          'Authorization': apiKey,
        },
      });
      setCommentText('');
      // Re-fetch comments after adding a new one
      const response = await axios.get(`http://127.0.0.1:8000/api/comments_tree/?origen=Submission&origin_id=${id}`, {
        headers: {
          'Authorization': apiKey,
        },
      });
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
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
                          rank={1} // Puedes ajustar el rank según sea necesario
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
                            style={{marginLeft: '20px'}} // Ajusta el valor según sea necesario
                        />
                        <br/>
                        <button type="submit" style={{marginLeft: '20px'}}>add comment</button>
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
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                              <td>{comment.text}</td>
                            </tr>
                          ))}
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