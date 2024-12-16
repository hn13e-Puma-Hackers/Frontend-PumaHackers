import React from 'react';
import './submissionItem.css';

const SubmissionItem = ({ submission, rank, onVote, onUnvote, onHide, onUnhide, onFavorite, onUnfavorite, onDelete }) => {
    // Formateo de la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Formato legible
    };
    const user = {
        isAuthenticated: true, // Cambia según el estado de autenticación
        username: 'anyer',
        karma: 150,
    };
    return (
        <>
            {/* Fila principal */}
            <tr className="athing" id={`submission_${submission.id}`}>
                <td align="right" valign="top" className="title">
                    <span className="rank">{rank}.</span>
                </td>
                <td valign="top" className="votelinks">
                    <center>
                        {!submission.voted && user.username !== submission.author ? (
                            <button
                                className="votearrow"
                                title="upvote"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onVote(submission.id)}
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
              {submission.voted && user.username !== submission.author && (
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
                          onClick={() => onUnvote(submission.id)}
                      >
                          unvote
                      </button>{' '}
                      |
                  </>
              )}
              {/* Hide/Unhide */}
              {submission.hidden ? (
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
                      onClick={() => onUnhide(submission.id)}
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
                      onClick={() => onHide(submission.id)}
                  >
                      hide
                  </button>
              )}{' '}
              | {' '}
              {/* Edit/Delete */}
              {user.username === submission.author && (
                  <>
                      <a href={`/submission/edit/${submission.id}`} style={{ color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}>
                          edit
                      </a>{' '}
                      | {' '}
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
                          onClick={() => onDelete(submission.id)}
                      >
                          delete
                      </button>{' '}
                      |
                  </>
              )}
              {/* Comments */}
              <a href={`/submission/${submission.id}`} style={{ color: 'gray', cursor: 'pointer', fontSize: 'inherit' }}>
              {submission.comments_count} comments
            </a>{' '}
              | {' '}
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
                      submission.favorited ? onUnfavorite(submission.id) : onFavorite(submission.id)
                  }
              >
              {submission.favorited ? 'un-favorite' : 'favorite'}
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
