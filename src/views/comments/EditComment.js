import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import api from '../../api';
import CommentItem from '../../components/commentItem';

const CommentDetail = () => {
    const { id } = useParams();
    const { apiKey } = useContext(ApiKeyContext);
    const [comment, setComment] = useState(null);
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await api.get(`/api/comments/${id}/`, {
                    headers: {
                        'Authorization': apiKey,
                    },
                });
                setComment(response.data);
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        };

        fetchComment();
    }, [apiKey, id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/api/comments/${id}/`, {
                text: commentText,
            }, {
                headers: {
                    'Authorization': apiKey,
                },
            });
            setCommentText('');
            navigate(`/submissions/${comment.submission}`);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = () => {
        navigate('/comments');
    };

    if (!comment) {
        return <div>Loading...</div>;
    }

    return (
        <center>
            <table width="85%" bgcolor="#f6f6ef">
                <tbody>
                <tr id="pagespace" title="" style={{ height: '10px' }}></tr>
                <tr>
                    <td>
                        <table border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td>
                                    <CommentItem comment={comment}
                                     onDelete={handleDeleteComment}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows="8"
                            cols="80"
                            style={{ marginLeft: '32px' }}
                        />
                                        <br />
                                        <button type="submit" style={{ marginLeft: '32px' }}>edit comment</button>
                                    </form>
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

export default CommentDetail;