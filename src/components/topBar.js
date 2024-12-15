import React from 'react';

const TopBar = () => {
  const user = {
    username: 'xavier',
    karma: 150, // Puedes cambiar esto según lo que necesite mostrar
  };

  return (
    <div style={{ backgroundColor: '#ff6600', padding: '2px' }}>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '18px', paddingRight: '4px' }}>
              <img
                src="/path/to/pumaphoto.jpeg"
                alt="Puma Logo"
                width="18"
                height="18"
                style={{ border: '1px solid white' }}
              />
            </td>
            <td>
              <span>
                <b>
                  <a href="/">Puma Hacker News</a>
                </b>
                <a href="/new">new</a> | <a href={`/threads/${user.username}`}>threads</a> |{' '}
                <a href="/comments">comments</a> | <a href="/ask">ask</a> | <a href="/submit">submit</a> |{' '}
                <a href={`/favorites/${user.username}`}>favorites</a>
                <form action="/search" method="GET" style={{ display: 'inline' }}>
                  <input type="text" name="query" placeholder="Search" required />
                  <button type="submit">Search</button>
                </form>
              </span>
            </td>
            <td style={{ textAlign: 'right', paddingRight: '4px' }}>
              <a href={`/profile/${user.username}`}>{user.username}</a> (<span>{user.karma}</span>)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopBar;
