import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext';
import api from '../../api';

const CreateSubmission = () => {
    const { apiKey } = useContext(ApiKeyContext); // Obtén la API key del contexto
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        text: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Para redirigir a otras páginas

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validar que al menos uno de los campos (url o text) esté lleno
        if (!formData.url && !formData.text) {
            setError('Debes proporcionar al menos una URL o texto.');
            return;
        }

        try {
            const response = await api.post('/api/submissions/', formData, {
                headers: {
                    'Authorization': apiKey,
                },
            });

            // Redirigir a MainPage si la submission se creó correctamente
            setSuccess(true);
            console.log('Submission creada:', response.data);
            setFormData({ title: '', url: '', text: '' }); // Reiniciar el formulario
            navigate('/'); // Redirige a MainPage
        } catch (err) {
            if (err.response && err.response.status === 409) {
                // Si el backend devuelve un error 409, redirigir a SubmissionDetail
                const { id } = err.response.data;
                navigate(`/submissions/${id}`); // Redirige a la página de detalle
            } else {
                console.error('Error creando la submission:', err);
                setError('Error al enviar la submission. Intenta de nuevo.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Crear Submission</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Submission creada con éxito.</div>}
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
                    Crear
                </button>
            </form>
        </div>
    );
};

export default CreateSubmission;
