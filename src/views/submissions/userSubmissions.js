import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiKeyContext } from '../../context/ApiKeyContext'; // Adjusted path
import SubmissionItem from '../../components/submissionItem'; // Adjusted path
import api from '../../api';

const UserSubmissions = () => {
  const { apiKey } = useContext(ApiKeyContext); // Obtiene la API key del contexto
  const { username } = useParams(); // Obtiene el username de la URL
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/api/${username}/submissions/`, {
          headers: {
            'Authorization': apiKey, // Usa la API key en los headers
          },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [apiKey, username]); // Incluye apiKey y username como dependencias

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

export default UserSubmissions;