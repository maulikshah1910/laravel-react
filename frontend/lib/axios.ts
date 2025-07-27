import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'API_KEY': process.env.NEXT_PUBLIC_API_KEY || '', // if needed
    },
});

export default api;
