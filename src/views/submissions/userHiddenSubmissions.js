import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext'; // Adjusted path
import SubmissionItem from '../../components/submissionItem'; // Adjusted path
import axios from 'axios';

const UserHiddenSubmissions = () => {
  const { apiKey } = useContext(ApiKeyContext); // Obtiene la API key del contexto
  const { username } = useParams(); // Obtiene el username de la URL
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchHiddenSubmissions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/hidden_submissions/`, {
          headers: {
            'Authorization': apiKey, // Usa la API key en los headers
          },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching hidden submissions:', error);
      }
    };

    fetchHiddenSubmissions();
  }, [apiKey]); // Incluye apiKey y username como dependencias

  const handleUnhide = (submissionId) => {
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
                    <SubmissionItem key={submission.id} submission={submission} rank={index + 1} onUnhide={handleUnhide}/>
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

export default UserHiddenSubmissions;