import axios from 'axios';

const api = axios.create({
  baseURL: 'https://puma-hackers-8a28327c331a.herokuapp.com/', // URL de tu API
});

export default api;
