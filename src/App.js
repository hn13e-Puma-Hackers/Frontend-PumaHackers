import React from 'react';
import { ApiKeyProvider } from './context/ApiKeyContext'; // Ajusta la ruta según corresponda
import TopBar from './components/topBar';
import MainPage from './views/submissionsList';

function App() {
    return (
        <ApiKeyProvider>
            <div>
                <TopBar />
                <MainPage />
            </div>
        </ApiKeyProvider>
    );
}

export default App;
