import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import CommentItem from '../../components/commentItem';

const AllComments = () => {
  const { apiKey } = useContext(ApiKeyContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/comments/', {
          headers: {
            'Authorization': apiKey,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [apiKey]);

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
                      onVote={() => {}}
                      onUnvote={() => {}}
                      onFavorite={() => {}}
                      onUnfavorite={() => {}}
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

export default AllComments;