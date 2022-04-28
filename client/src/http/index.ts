import axios from 'axios';
import {AuthResponse} from "../interfaces/response/AuthResponse";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    // baseURL: process.env.API_URL+`/api`,
})

$api.interceptors.request.use((config) => {
    if (config.headers !== undefined)
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            //console.log(e)
            console.log('Користувач не авторизований')
        }
    }
    throw error;
})

export default $api;