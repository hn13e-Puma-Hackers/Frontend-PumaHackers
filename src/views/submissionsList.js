import React, { useEffect, useState, useContext } from 'react';
import { ApiKeyContext } from '../context/ApiKeyContext';
import SubmissionItem from '../components/submissionItem';
import axios from 'axios';

const MainPage = () => {
  const { apiKey, username } = useContext(ApiKeyContext); // Obtiene la API key del contexto
  console.log('API Keyyy:', apiKey); // Este log se ejecuta cada vez que se renderiza
  console.log('user: ', username);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/submissions/', {
          headers: {
            'Authorization': apiKey, // Usa la API key en los headers
          },
        });
        console.log('hey: ', apiKey);
        console.log('API Response:', response.data);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [apiKey]); // Incluye apiKey como dependencia

  const handleHide = (submissionId) => {
      setSubmissions(submissions.filter(sub => sub.id !== submissionId));
  };

  return (
      <center>
        <table width="85%" bgcolor="#f6f6ef">
          <tbody>
          {/* Spacer */}
          <tr id="pagespace" title="" style={{ height: '10px' }}></tr>

          {/* Submission Items */}
          <tr>
            <td>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                {submissions.map((submission, index) => (
                    <SubmissionItem key={submission.id} submission={submission} rank={index + 1} onHide={handleHide}/>
                ))}
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </center>
  );
};

export default MainPage;
