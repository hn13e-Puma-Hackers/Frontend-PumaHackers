import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './views/submissionsList';
import UserProfile from './views/userProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
