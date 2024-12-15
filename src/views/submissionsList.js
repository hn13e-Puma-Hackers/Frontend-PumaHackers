import React, { useEffect, useState } from 'react';
import TopBar from '../components/topBar';
import SubmissionItem from '../components/submissionItem';
import axios from 'axios';

const MainPage = () => {
  const [submissions, setSubmissions] = useState([]);

  // Fetch submissions from the API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/submissions/');
        console.log('API Response:', response.data); // Verifica los datos devueltos
        setSubmissions(response.data); // Almacena directamente el array en el estado
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div style={{ backgroundColor: '#f6f6ef', padding: '10px' }}>
      <TopBar />
      <table style={{ width: '85%', margin: '0 auto' }}>
        <tbody>
          {submissions.map((submission) => (
            <SubmissionItem key={submission.id} submission={submission} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
