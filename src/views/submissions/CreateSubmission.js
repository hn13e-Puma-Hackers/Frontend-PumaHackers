import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import api from '../../api';

const SubmissionForm = () => {
    const { apiKey } = useContext(ApiKeyContext); // Obtén la API key del contexto
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        text: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Obtiene el ID de la URL para modo edición

    // Precargar datos si estamos editando
    useEffect(() => {
        if (id) {
            const fetchSubmission = async () => {
                try {
                    const response = await api.get(`/api/submissions/${id}/`, {
                        headers: { Authorization: apiKey },
                    });
                    setFormData({
                        title: response.data.title,
                        url: response.data.url || '',
                        text: response.data.text || '',
                    });
                } catch (err) {
                    console.error('Error al cargar la submission:', err);
                    setError('No se pudo cargar la submission.');
                }
            };
            fetchSubmission();
        }
    }, [id, apiKey]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidURL = (url) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)([^\s]*)$/i;
        return urlRegex.test(url);
    };

    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (formData.url && !isValidURL(formData.url)) {
            setError('La URL proporcionada no es válida. Introduce una URL correcta.');
            return;
        }

        if (!formData.url && !formData.text) {
            setError('Debes proporcionar al menos una URL o texto.');
            return;
        }

        try {
            if (id) {
                // Modo edición: Actualizar la submission
                await api.patch(`/api/submissions/${id}/`, formData, {
                    headers: { Authorization: apiKey },
                });
                console.log('Submission actualizada con éxito.');
            } else {
                // Modo creación: Crear una nueva submission
                await api.post('/api/submissions/', formData, {
                    headers: { Authorization: apiKey },
                });
                console.log('Submission creada con éxito.');
            }

            setSuccess(true);
            navigate('/'); // Redirige a la página principal
        } catch (err) {
            if (err.response && err.response.status === 409) {
                // Si el backend devuelve un error 409, redirigir a SubmissionDetail
                const { id: existingId } = err.response.data; // Obtener el ID de la response
                console.log('Redirigiendo a submission existente:', existingId);
                navigate(`/submissions/${existingId}`);
            } else {
                console.error('Error al enviar la submission:', err);
                setError('Error al enviar la submission. Intenta de nuevo.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>{id ? 'Editar Submission' : 'Crear Submission'}</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && (
                <div style={{ color: 'green' }}>
                    {id ? 'Submission actualizada con éxito.' : 'Submission creada con éxito.'}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="url">URL:</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="text">Texto:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        rows="4"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ff6600',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    {id ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;
