import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate()

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('Authorization');

    if (token) {
        req.headers.Authorization = token;
    }

    return req;
});

api.interceptors.response.use((res) => {
    return res;
}, (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('Authorization');
        navigate('/login');
    }
    return Promise.reject(error);
});

export default api