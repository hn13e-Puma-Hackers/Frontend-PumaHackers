import React from 'react';
import { Link } from 'react-router-dom';
import './submissionItem.css';

const SubmissionItem = ({ submission }) => {
  // Formateo de la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formato legible
  };

  return (
    <>
      {/* Fila principal */}
      <tr className="athing" id={`submission_${submission.id}`}>
        <td align="right" valign="top" className="title">
          <span className="rank">{submission.id}.</span>
        </td>
        <td valign="top" className="votelinks">
          <center>
            {/* Botón de votar */}
            <button
              className="votearrow"
              title="upvote"
              style={{ cursor: 'pointer', visibility: submission.voted ? 'hidden' : 'visible' }}
              onClick={() => alert(`Voted for submission ${submission.id}`)} // Simula la acción de votar
            ></button>
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
              <Link to={`/submission/${submission.id}`}>{submission.title}</Link>
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
            <Link className="hnuser" to={`/profile/${submission.author}`}>
              {submission.author ? submission.author : 'Unknown'}
            </Link>{' '}
            <span className="age" title={submission.created_at}>
              {formatDate(submission.created_at)} ago
            </span>{' '}
            |{' '}
            {/* Botón de favorito */}
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'gray',
                cursor: 'pointer',
                fontSize: 'inherit',
              }}
              onClick={() =>
                alert(
                  submission.favorited
                    ? `Un-favorited submission ${submission.id}`
                    : `Favorited submission ${submission.id}`
                )
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
