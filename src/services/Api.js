import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/carlao/monitoria/backend', // Atualize com o endereço do seu servidor backend
});

export default api;
