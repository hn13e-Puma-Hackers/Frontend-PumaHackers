import React from 'react';
import pumaphoto from './pumaphoto.jpeg'; // Importa la imagen

const TopBar = () => {
  const user = {
    isAuthenticated: true, // Cambia según el estado de autenticación
    username: 'xavier',
    karma: 150,
  };

  return (
      <div>
        <table
            style={{
              width: '100%',
              padding: '2px',
              backgroundColor: '#ff6600',
            }}
            cellPadding="0"
            cellSpacing="0"
        >
          <tbody>
          <tr>
            <td style={{ width: '18px', paddingRight: '4px' }}>
              <img
                  src={pumaphoto}
                  alt="Puma Logo"
                  width="18"
                  height="18"
                  style={{ border: '1px solid white', display: 'block' }}
              />
            </td>
            <td style={{ lineHeight: '12pt', height: '10px' }}>
              <span className="pagetop">
                <b className="hnname">
                  <a href="/">Puma Hacker News</a>
                </b>{' '}
                <a href="/new" rel="nofollow">new</a> |{' '}
                <a
                    href={user.isAuthenticated ? `/threads/${user.username}` : '#'}
                    rel="nofollow"
                >
                  threads
                </a>{' '}
                | <a href="/comments" rel="nofollow">comments</a> |{' '}
                <a href="/ask" rel="nofollow">ask</a> |{' '}
                <a href="/submit" rel="nofollow">submit</a> |{' '}
                {user.isAuthenticated && (
                    <>
                      <a
                          href={`/favorites/${user.username}`}
                          rel="nofollow"
                      >
                        favorites
                      </a>{' '}
                      |
                    </>
                )}
                <form
                    action="/search"
                    method="GET"
                    style={{ display: 'inline' }}
                >
                  <input
                      type="text"
                      name="query"
                      placeholder="Search"
                      required
                  />
                  <button type="submit">Search</button>
                </form>
              </span>
            </td>
            <td style={{ textAlign: 'right', paddingRight: '4px' }}>
              <span className="pagetop">
                {user.isAuthenticated ? (
                    <>
                    <span id="me">
                      <a href={`/profile/${user.username}`}>
                        {user.username}
                      </a>
                    </span>{' '}
                      (<span id="karma">{user.karma}</span>) |{' '}
                      <form
                          action="/logout"
                          method="POST"
                          style={{ display: 'inline' }}
                      >
                        <button
                            type="submit"
                            id="logout"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              color: 'black',
                              cursor: 'pointer',
                              fontSize: 'inherit',
                            }}
                        >
                          Logout
                        </button>
                      </form>
                    </>
                ) : (
                    <a href="/login?goto=news">Login</a>
                )}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
};

export default TopBar;
