import React from 'react';
import { ApiKeyProvider } from './context/ApiKeyContext'; // Ajusta la ruta según corresponda
import TopBar from './components/topBar';
import MainPage from './views/submissionsList';
import UserProfile from './views/userProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <ApiKeyProvider>
            <div>
                <TopBar />
                <MainPage />
                <Route path="/profile/:username" element={<UserProfile />} />
            </div>
        </ApiKeyProvider>
    );
}

export default App;
