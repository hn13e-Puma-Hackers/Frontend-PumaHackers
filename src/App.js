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
import UserSubmissions from "./views/submissions/userSubmissions";
import UserComments from "./views/comments/userComments";
import UserFavoriteSubmissions from "./views/submissions/userFavoriteSubmissions";
import UserFavoriteComments from "./views/comments/userFavoriteComments";
import UserHiddenSubmissions from "./views/submissions/userHiddenSubmissions";
import UserVotedSubmissions from "./views/submissions/userVotedSubmissions"; // Import the Submissions component
import UserVotedComments from './views/comments/userVotedComments';
import SearchResults from "./views/submissions/SearchResults";
import AskSubmissions from "./views/submissions/AskSubmissions";
import NewSubmissions from "./views/submissions/NewSubmissions";
import CreateSubmission from "./views/submissions/CreateSubmission";
import EditComment from "./views/comments/EditComment";

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
                        <Route path="/:username/comments" element={<UserComments />} />
                        <Route path="/:username/favorite_submissions" element={<UserFavoriteSubmissions />} />
                        <Route path="/:username/favorite_comments" element={<UserFavoriteComments />} />
                        <Route path="/:username/hidden_submissions" element={<UserHiddenSubmissions />} />
                        <Route path="/:username/voted_submissions" element={<UserVotedSubmissions />} />
                        <Route path="/:username/voted_comments" element={<UserVotedComments />} />
                        <Route path="search_submissions" element={<SearchResults />} />
                        <Route path={"/ask"} element={<AskSubmissions />} />
                        <Route path={"/new"} element={<NewSubmissions />} />
                        <Route path={"submissions/add"} element={<CreateSubmission />} />
                        <Route path="/comment/edit/:id" element={<EditComment />} />
                        <Route path="/ask" element={<AskSubmissions />} />
                        <Route path="/new" element={<NewSubmissions />} />
                        <Route path="submissions/add" element={<CreateSubmission />} />
                        <Route path="/submission/edit/:id" element={<CreateSubmission />} />
                    </Routes>
                </div>
            </Router>
        </ApiKeyProvider>
    );
}

export default App;