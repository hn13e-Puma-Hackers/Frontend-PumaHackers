import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../components/topBar';

const UserProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    about: '',
    banner: null,
    avatar: null,
  });

  const apiKey = 'u3o5nyf6.IElFeLGqYUHZpdf8jPMoT9HcHFbvv0YN'; // Tu API Key
  const loggedInUser = 'xavier'; // Cambiar por lógica dinámica si es necesario

  // Función para cargar el perfil desde la API
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`, {
        headers: {
          Authorization: apiKey,
        },
      });
      setProfile(response.data);

      // Determinar si es el perfil propio
      setIsOwnProfile(username === loggedInUser);

      // Inicializar valores en el formulario
      setFormData({
        about: response.data.about || '',
        banner: null,
        avatar: null,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Cargar el perfil al iniciar el componente
  useEffect(() => {
    fetchProfile();
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('about', formData.about);

    // Solo añadir banner o avatar si hay nuevos valores
    if (formData.banner) {
      updateData.append('banner', formData.banner);
    }
    if (formData.avatar) {
      updateData.append('avatar', formData.avatar);
    }

    try {
      await axios.patch('http://127.0.0.1:8000/api/profile/', updateData, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      fetchProfile();
      setEditMode(false);
      setFormData({ ...formData, banner: null, avatar: null });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Barra de navegación superior */}
      <center>
        <table width="85%" bgcolor="#f6f6ef">
          <tbody>
            <tr>
              <td colSpan="3">
              </td>
            </tr>
          </tbody>
        </table>
      </center>

      {/* Pantalla de perfil de usuario */}
      <div className="profile-container" style={{ width: '85%', margin: '0 auto', textAlign: 'left' }}>
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          {/* Mostrar el banner */}
          <div className="profile-banner-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={profile.banner || 'https://via.placeholder.com/800x200'}
              alt="Banner"
              className="profile-banner"
              style={{ width: '99.5%', height: '200px', objectFit: 'cover' }}
            />
          </div>

          {/* Mostrar el avatar */}
          <div
            className="profile-avatar-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '-100px',
            }}
          >
            <img
              src={profile.avatar || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="profile-avatar"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid white',
              }}
            />
          </div>

          {isOwnProfile && (
            <>
              {/* Casilla de eliminar banner */}
              <div className="field" style={{ marginBottom: '15px' }}>
                <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  Banner:
                </span>
                <input type="checkbox" name="delete_banner" onChange={handleInputChange} /> delete
                <span style={{ margin: '0 10px' }}>OR</span>
                <input type="file" name="banner" onChange={handleFileChange} />
              </div>

              {/* Casilla de eliminar avatar */}
              <div className="field" style={{ marginBottom: '15px' }}>
                <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  Avatar:
                </span>
                <input type="checkbox" name="delete_avatar" onChange={handleInputChange} /> delete
                <span style={{ margin: '0 10px' }}>OR</span>
                <input type="file" name="avatar" onChange={handleFileChange} />
              </div>
            </>
          )}

          {/* Información del usuario */}
          <div className="field" style={{ marginBottom: '15px' }}>
            <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
              User:
            </span>
            {profile.username}
          </div>
          <div className="field" style={{ marginBottom: '15px' }}>
            <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
              Created:
            </span>
            {new Date(profile.created).toLocaleDateString()}
          </div>
          <div className="field" style={{ marginBottom: '15px' }}>
            <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
              Karma:
            </span>
            {profile.karma}
          </div>
          {isOwnProfile ? (
            <>
              <div className="field" style={{ marginBottom: '15px' }}>
                <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  API Key:
                </span>
                {profile.api_key}
              </div>
              <div className="field" style={{ marginBottom: '15px' }}>
                <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  About:
                </span>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  style={{ width: '100%', height: '80px' }}
                />
              </div>
            </>
          ) : (
            <div className="field" style={{ marginBottom: '15px' }}>
              <span className="field-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                About:
              </span>
              {profile.about || 'Sin información'}
            </div>
          )}

          {/* Enlaces */}
          <div className="links-section" style={{ marginTop: '20px' }}>
            <div>
            <a href={`/profile/${profile.username}/submissions`}>Submissions</a> |
            <a href={`/profile/${profile.username}/comments`}> Comments</a>
            </div>
            <div>
            <a href={`/profile/${profile.username}/favorite-submissions`}>Favorite Submissions</a> |
            <a href={`/profile/${profile.username}/favorite-comments`}> Favorite Comments</a>
            </div>
            {isOwnProfile && (
              <>
                {' '}
                | <a href={`/profile/${profile.username}/hidden-submissions`}> Hidden Submissions</a> |
                <a href={`/profile/${profile.username}/voted-submissions`}> Voted Submissions</a> |
                <a href={`/profile/${profile.username}/hidden-comments`}> Hidden Comments</a> |
                <a href={`/profile/${profile.username}/voted-comments`}> Voted Comments</a>
              </>
            )}
          </div>

          {isOwnProfile && (
            <div className="buttons-container" style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <button type="submit" className="btn-update">
                Update
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default UserProfile;