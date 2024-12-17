import React, { createContext, useState } from 'react';

// Crear el contexto
export const ApiKeyContext = createContext();

// Proveedor del contexto
export const ApiKeyProvider = ({ children }) => {
    // Inicializar estado para API key y username
    const [apiKey, setApiKey] = useState('');
    const [username, setUsername] = useState('');

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey, username, setUsername }}>
            {children}
        </ApiKeyContext.Provider>
    );
};
