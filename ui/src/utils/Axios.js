import axios from 'axios';

const apiEndPoint = axios.create({
    // .. where we make our configurations
    baseURL: 'http://localhost:8080/api/',
});

export default apiEndPoint;