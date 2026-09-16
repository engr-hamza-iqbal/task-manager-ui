import api from "../api.js";

export const register = async (credentials) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
}

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
}
