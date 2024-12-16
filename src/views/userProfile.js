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
      const loggedInUser = 'xavier'; // Cambiar por lógica dinámica
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
      // Realiza la solicitud PATCH
      await axios.patch('http://127.0.0.1:8000/api/profile/', updateData, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');

      // Vuelve a cargar el perfil actualizado
      fetchProfile();

      setEditMode(false);
      setFormData({ ...formData, banner: null, avatar: null }); // Limpiar archivos seleccionados
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
      <TopBar />
      <div className="profile-container" style={{ width: '85%', margin: '0 auto', textAlign: 'left' }}>
        <div className="profile-banner-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={profile.banner || 'https://via.placeholder.com/800x200'}
            alt="Banner"
            className="profile-banner"
            style={{ width: '99.5%', height: '200px', objectFit: 'cover' }}
          />
        </div>

        <div className="profile-avatar-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '-100px' }}>
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

        <div style={{ marginTop: '20px' }}>
          <div className="field">
            <strong>Usuario:</strong> {profile.username}
          </div>
          <div className="field">
            <strong>Creado:</strong> {new Date(profile.created).toLocaleDateString()}
          </div>
          <div className="field">
            <strong>Karma:</strong> {profile.karma}
          </div>
          {!editMode ? (
            <div className="field">
              <strong>Sobre mí:</strong> {profile.about || 'Sin información'}
            </div>
          ) : (
            <div className="field">
              <strong>Sobre mí:</strong>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                style={{ width: '100%', height: '80px' }}
              />
            </div>
          )}
        </div>

        <div className="links-section" style={{ marginTop: '20px' }}>
          <a href={`/profile/${profile.username}/submissions`}>Submissions</a> |
          <a href={`/profile/${profile.username}/comments`}> Comments</a>
          {isOwnProfile && (
            <>
              {' '}
              | <a href="/hidden">Hidden</a> | <a href="/upvoted">Upvoted</a>
            </>
          )}
        </div>

        {isOwnProfile && (
          <>
            {editMode ? (
              <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                <div className="field">
                  <strong>Actualizar Banner:</strong>
                  <input type="file" name="banner" onChange={handleFileChange} />
                </div>
                <div className="field">
                  <strong>Actualizar Avatar:</strong>
                  <input type="file" name="avatar" onChange={handleFileChange} />
                </div>
                <div className="buttons-container">
                  <button type="submit" className="btn-update">Guardar Cambios</button>
                  <button type="button" className="btn-update" onClick={() => setEditMode(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <button className="btn-update" onClick={() => setEditMode(true)}>Editar Perfil</button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
