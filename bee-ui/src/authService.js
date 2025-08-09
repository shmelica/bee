import api from './api';

export const getCsrf = () => api.get('/sanctum/csrf-cookie');

export const register = async ({ name, email, password, password_confirmation }) => {
    await getCsrf();
    return api.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation
    });
};

export const login = async ({ email, password }) => {
    await getCsrf();
    return api.post('/auth/login', { email, password });
};

export const getMe = () => api.get('/auth/me');

export const logout = () => api.post('/auth/logout');