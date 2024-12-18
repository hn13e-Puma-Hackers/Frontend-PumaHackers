import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './submissionItem.css';
import api from '../api';
import { ApiKeyContext } from '../context/ApiKeyContext';

const SubmissionItem = ({ submission, rank, onHide, onUnhide, onUnfavorite, onUnvote }) => {
    const { apiKey, username } = useContext(ApiKeyContext);
    const [favorited, setFavorited] = useState(submission.favorited);
    const [voted, setVoted] = useState(submission.voted);
    const [hidden, setHidden] = useState(submission.hidden);

    useEffect(() => {
        setFavorited(submission.favorited);
        setVoted(submission.voted);
        setHidden(submission.hidden);
    }, [submission.favorited, submission.voted, submission.hidden]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Formato legible
    };

    const handleActionPatch = async (submissionId, url) => {
        try {
            const response = await api.patch(
                `api/submissions/${submissionId}/${url}/`,
                {
                    headers: {
                        'Authorization': apiKey,
                    },
                }
            );
            console.log(`${url} exitoso:`, response.data);

            // Actualiza el estado local si la acción es de favorite/unfavorite, vote/unvote o hide/unhide
            if (url === 'favorite') {
                setFavorited(true);
            } else if (url === 'unfavorite') {
                setFavorited(false);
                onUnfavorite(submissionId); // Llama a la función onUnfavorite para remover la submission
            } else if (url === 'vote') {
                setVoted(true);
            } else if (url === 'unvote') {
                setVoted(false);
                onUnvote(submissionId); // Llama a la función onUnvote para remover la submission
            } else if (url === 'hide') {
                setHidden(true);
                onHide(submissionId); // Llama a la función onHide para remover la submission
            } else if (url === 'unhide') {
                setHidden(false);
                onUnhide(submissionId); // Llama a la función onUnhide para remover la submission
            }
        } catch (error) {
            console.error(`Error al realizar la acción ${url}:`, error);
        }
    };

    const handleDelete = async (submissionId) => {
        try {
            const response = await api.delete(`api/submissions/${submissionId}/`, {
                headers: {
                    'Authorization': apiKey, // Usa la API key en los headers
                },
            });
            setHidden(true);
            onHide(submissionId);
            console.log('Delete exitoso:', response.data);
        } catch (error) {
            console.error('Error al hacer delete:', error);
        }
    };

    return (
        <>
            {/* Fila principal */}
            <tr className="athing" id={`submission_${submission.id}`}>
                <td align="right" valign="top" className="title">
                    <span className="rank">{rank}</span>
                </td>
                <td valign="top" className="votelinks">
                    <center>
                        {!voted && username !== submission.author ? (
                            <button
                                className="votearrow"
                                title="upvote"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleActionPatch(submission.id, 'vote')}
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
                <td className="title">
                    <span className="titleline">
                        {submission.url ? (
                            <>
                                <a href={submission.url} target="_blank" rel="noopener noreferrer">
                                    {submission.title}
                                </a>
                                <span className="sitebit comhead">
                                    {' '}
                                    (<a href={submission.url}>
                                        <span className="sitestr">{submission.url}</span>
                                    </a>)
                                </span>
                            </>
                        ) : (
                            <a href={`/submission/${submission.id}`}>{submission.title}</a>
                        )}
                    </span>
                </td>
            </tr>

            {/* Fila de detalles */}
            <tr>
                <td colSpan="2"></td>
                <td className="subtext">
                    <span className="subline">
                        {/* Número de votos */}
                        <span className="score" id={`score_${submission.id}`}>
                            {submission.votes} points
                        </span>{' '}
                        by{' '}
                        {submission.author ? (
                            <a href={`/profile/${submission.author}`}>
                                <span className="hnuser">{submission.author}</span>
                            </a>
                        ) : (
                            <span className="hnuser">Unknown</span>
                        )}{' '}
                        <span className="age" title={submission.created_at}>
                            {formatDate(submission.created_at)} ago
                        </span>{' '}
                        |{' '}
                        {/* Unvote */}
                        {voted && username !== submission.author && (
                            <>
                                <button
                                    className="unvotetext"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        color: 'gray',
                                        cursor: 'pointer',
                                        fontSize: 'inherit',
                                    }}
                                    onClick={() => handleActionPatch(submission.id, 'unvote')}
                                >
                                    unvote
                                </button>{' '}
                                |{' '}
                            </>
                        )}
                        {/* Hide/Unhide */}
                        {hidden ? (
                        <button
                            className="hide-link"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: 'gray',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                            }}
                            onClick={() => handleActionPatch(submission.id, 'unhide')}
                        >
                            un-hide
                        </button>
                        ) : (
                            <button
                                className="hide-link"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    color: 'gray',
                                    cursor: 'pointer',
                                    fontSize: 'inherit',
                                }}
                                onClick={() => handleActionPatch(submission.id, 'hide')}
                            >
                                hide
                            </button>
                        )}{' '}
                        |{' '}
                        {/* Edit/Delete */}
                            {username === submission.author && (
                            <>
                                <a
                                    href={`/submission/edit/${submission.id}`}
                                    style={{ color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                                >
                                    edit
                                </a>{' '}
                                |{' '}
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        color: 'gray',
                                        cursor: 'pointer',
                                        fontSize: 'inherit',
                                    }}
                                    className="delete-link"
                                    onClick={() => handleDelete(submission.id)}
                                >
                                    delete
                                </button>{' '}
                                |{' '}
                            </>
                        )}
                        {/* Comments */}
                        <Link
                            to={`/submissions/${submission.id}`}
                            style={{ color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}
                        >
                            {submission.comments_count} comments
                        </Link>{' '}
                        |{' '}
                        {/* Favorite/Unfavorite */}
                        <button
                            className="favorite-link"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: 'gray',
                                cursor: 'pointer',
                                fontSize: 'inherit',
                            }}
                            onClick={() =>
                                favorited
                                    ? handleActionPatch(submission.id, 'unfavorite')
                                    : handleActionPatch(submission.id, 'favorite')
                            }
                        >
                            {favorited ? 'un-favorite' : 'favorite'}
                        </button>
                    </span>
                </td>
            </tr>

            {/* Espaciador */}
            <tr className="spacer" style={{ height: '5px' }}></tr>
        </>
    );
};

export default SubmissionItem;