import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiKeyContext } from '../context/ApiKeyContext';
import pumaphoto from './pumaphoto.jpeg';
import api from '../api';

const TopBar = () => {
  const { setApiKey, setUsername } = useContext(ApiKeyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const users = {
    anyer: { apiKey: 'knZY82G0.ubNOqTFSeJBQB6F2hMZKpANRiFOswB05', username: 'anyer', isAuthenticated: true},
    xavier: { apiKey: 'z5vPhAkZ.HJFzqF7apBh3FyVF46lvqO0BCqT3CVEP', username: 'xavier', isAuthenticated: true},
    anonymous: {apiKey: '', username: 'anonymous', isAuthenticated: false},
  };

  const [selectedUser, setSelectedUser] = useState(() => localStorage.getItem('selectedUser') || 'xavier');
  const currentUser = users[selectedUser];
  const [karma, setKarma] = useState(null);

  useEffect(() => {
    setApiKey(currentUser.apiKey);
    setUsername(currentUser.username);
    localStorage.setItem('selectedUser', selectedUser);
    handleGetKarma();
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

  const handleGetKarma = async () => {
    try {
      const response = await api.get(`/api/profile/${currentUser.username}/`, {
        headers: {
          Authorization: currentUser.apiKey,
        },
      });
      setKarma(response.data.karma);

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
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
                  <a href={currentUser.isAuthenticated ? `/${currentUser.username}/comments` : '#'} rel="nofollow">threads</a>{' '}
                  | <Link to="/comments" rel="nofollow">comments</Link> |{' '}
                  <Link to="/ask" rel="nofollow">ask</Link> |{' '}
                  {currentUser.isAuthenticated && (
                      <><Link to="/submissions/add" rel="nofollow">submit</Link> |{' '}
                      <Link to={`/${currentUser.username}/favorite_submissions`}>favorite</Link> |</>
                  )}
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
                        <span id="me"><a
                            href={`/profile/${currentUser.username}`}>{currentUser.username}</a></span>{' '}
                        (<span id="karma">{karma}</span>) |{' '}
                      </>
                  ) : (
                      <a href="/login?goto=news">Login </a>
                  )}
                  <select value={selectedUser} onChange={handleUserChange} style={{fontSize: '14px'}}>
                          {Object.keys(users).map((user) => (
                              <option key={user} value={user}>{user}</option>
                          ))}
                        </select>
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