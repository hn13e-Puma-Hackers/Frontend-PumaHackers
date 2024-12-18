import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiKeyProvider } from './context/ApiKeyContext'; // Adjust the path as needed
import TopBar from './components/topBar';
import MainPage from './views/submissionsList';
import UserProfile from './views/userProfile';
import SubmissionDetail from './views/submissions/submissionDetail';
import AllComments from './views/comments/allComments';
import './components/submissionItem.css';
import CommentDetail from "./views/comments/commentDetail";
import UserSubmissions from "./views/submissions/userSubmissions"; // Import the Submissions component

function App() {
    return (
        <ApiKeyProvider>
            <Router>
                <div>
                    {/* La barra superior siempre estará visible */}
                    <TopBar />

                    {/* Definimos las rutas */}
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/profile/:username" element={<UserProfile />} />
                        <Route path="/submissions/:id" element={<SubmissionDetail />} />
                        <Route path="/comments" element={<AllComments />} />
                        <Route path="/comment/:id" element={<CommentDetail />} />
                        <Route path="/:username/submissions" element={<UserSubmissions />} />
                    </Routes>
                </div>
            </Router>
        </ApiKeyProvider>
    );
}

export default App;