import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiKeyContext } from '../context/ApiKeyContext';
import pumaphoto from './pumaphoto.jpeg';

const TopBar = () => {
  const { setApiKey, setUsername } = useContext(ApiKeyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const users = {
    anyer5: { apiKey: 'DvDe8pCx.lmMYqkm6vsQzrzjYbSPw9D8dFHPbXfQM', username: 'anyer5', karma: 150, isAuthenticated: true },
    anyer3: { apiKey: 'Jgn3uq7g.6JatifZNviZUhCFCzwwKKi59NMZaUwOl', username: 'anyer3', karma: 200, isAuthenticated: true },
    xavier: { apiKey: 'u3o5nyf6.IElFeLGqYUHZpdf8jPMoT9HcHFbvv0YN', username: 'xavier', karma: 120, isAuthenticated: true },
    andreu: { apiKey: '0aECejJj.rFapl0TTamPZwqodC7uwX6qmDsqfsjri', username: 'andreu', karma: 120, isAuthenticated: true },
    andreu7: { apiKey: 'XCDi4asG.sBy76k8eK468aY3i4468H1toJttdo0vg', username: 'andreu7', karma: 120, isAuthenticated: true },
    broly369: { apiKey: 'iVXP3qQs.7l7mUTavytTWOWDMVPLHLzkCL8VMCtsh', username: 'broly369', karma: 120, isAuthenticated: true },
    broly: { apiKey: 'xd5LoILA.lw47bHt77RbYKkD5o2VekXYidjGZ61AP', username: 'broly', karma: 120, isAuthenticated: true },
  };

  const [selectedUser, setSelectedUser] = useState(() => localStorage.getItem('selectedUser') || 'xavier');
  const currentUser = users[selectedUser];

  useEffect(() => {
    setApiKey(currentUser.apiKey);
    setUsername(currentUser.username);
    localStorage.setItem('selectedUser', selectedUser);
  }, [selectedUser, setApiKey, setUsername]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate('/search_submissions', { state: searchQuery, replace: true }); // Esto envía el estado correctamente
  };

  return (
      <div>
        <center>
          <table style={{ width: '85%', padding: '2px', backgroundColor: '#ff6600' }} cellPadding="0" cellSpacing="0">
            <tbody>
            <tr>
              <td style={{ width: '18px', paddingRight: '4px' }}>
                <img src={pumaphoto} alt="Puma Logo" width="18" height="18" style={{ border: '1px solid white', display: 'block' }} />
              </td>
              <td style={{ lineHeight: '12pt', height: '10px' }}>
                <span className="pagetop">
                  <b className="hnname"><a href="/">Puma Hacker News</a></b>{' '}
                  <Link to="/new" rel="nofollow">new</Link> |{' '}
                  <a href={currentUser.isAuthenticated ? `/threads/${currentUser.username}` : '#'} rel="nofollow">threads</a>{' '}
                  | <Link to="/comments" rel="nofollow">comments</Link> |{' '}
                  <Link to="/ask" rel="nofollow">ask</Link> |{' '}
                  <a href="/submit" rel="nofollow">submit</a> |{' '}
                  {currentUser.isAuthenticated && (
                      <Link to={`/${currentUser.username}/favorite_submissions`}>favorite</Link>
                  )}{' '}
                  |
                  <form onSubmit={handleSearchSubmit} style={{ display: 'inline' }}>
                    <input type="text" name="query" placeholder="Search" value={searchQuery} onChange={handleSearchChange} required />
                    <button type="submit">Search</button>
                  </form>
                </span>
              </td>
              <td style={{ textAlign: 'right', paddingRight: '4px' }}>
                <span className="pagetop">
                  {currentUser.isAuthenticated ? (
                      <>
                        <span id="me"><a href={`/profile/${currentUser.username}`}>{currentUser.username}</a></span>{' '}
                        (<span id="karma">{currentUser.karma}</span>) |{' '}
                        <select value={selectedUser} onChange={handleUserChange} style={{ fontSize: '14px' }}>
                          {Object.keys(users).map((user) => (
                              <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
                      </>
                  ) : (
                      <a href="/login?goto=news">Login</a>
                  )}
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </center>
      </div>
  );
};

export default TopBar;