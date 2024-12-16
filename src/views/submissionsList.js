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
      <html lang="en">
      <head>
        <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/news.css" // Asegúrate de configurar correctamente el servidor para servir archivos estáticos
        />
        <title>Submission List</title>
        <link rel="icon" href="/static/img/pumaphoto.jpeg" type="image/jpeg" />
      </head>
      <body>
      <center>
        <table width="85%" bgcolor="#f6f6ef">
          <tbody>
          {/* TopBar */}
          <tr>
            <td colSpan="3">
              <TopBar />
            </td>
          </tr>

          {/* Spacer */}
          <tr id="pagespace" title="" style={{ height: '10px' }}></tr>

          {/* Submission Items */}
          <tr>
            <td>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                {submissions.map((submission, index) => (
                    <SubmissionItem key={submission.id} submission={submission} rank={index+1}/>
                ))}
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </center>
      </body>
      </html>
  );
};

export default MainPage;
