import React, { createContext, useState } from 'react';

// Crea el contexto
export const ApiKeyContext = createContext();

// Proveedor del contexto
export const ApiKeyProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState('');

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};
