import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const user = {
    username: 'xavier',
    karma: 150, // Cambia esto si necesitas más personalización
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
                  <Link to="/">Puma Hacker News</Link>
                </b>
                <Link to="/new">new</Link> |{' '}
                <Link to={`/threads/${user.username}`}>threads</Link> |{' '}
                <Link to="/comments">comments</Link> | <Link to="/ask">ask</Link> |{' '}
                <Link to="/submit">submit</Link> |{' '}
                <Link to={`/favorites/${user.username}`}>favorites</Link>
                <form action="/search" method="GET" style={{ display: 'inline' }}>
                  <input type="text" name="query" placeholder="Search" required />
                  <button type="submit">Search</button>
                </form>
              </span>
            </td>
            <td style={{ textAlign: 'right', paddingRight: '4px' }}>
              <Link to={`/profile/${user.username}`}>
                {user.username}
              </Link>{' '}
              (<span>{user.karma}</span>)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopBar;
