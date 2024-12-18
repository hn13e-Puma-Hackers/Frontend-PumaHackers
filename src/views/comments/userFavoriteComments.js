import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext'; // Adjusted path
import api from '../../api';
import CommentItem from '../../components/commentItem';

const UserFavoriteComments = () => {
  const { apiKey } = useContext(ApiKeyContext); // Obtiene la API key del contexto
  const { username } = useParams(); // Obtiene el username de la URL
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchFavoriteComments = async () => {
      try {
        const response = await api.get(`/api/favorite_comments/`, {
          headers: {
            'Authorization': apiKey, // Usa la API key en los headers
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching favorite comments:', error);
      }
    };

    fetchFavoriteComments();
  }, [apiKey, username]); // Incluye apiKey y username como dependencias

  const handleUnfavorite = (commentId) => {
    setComments(comments.filter(sub => sub.id !== commentId));
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
                      onVote={() => {}}
                      onUnvote={() => {}}
                      onFavorite={() => {}}

                      onUnfavorite={handleUnfavorite}
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

export default UserFavoriteComments;