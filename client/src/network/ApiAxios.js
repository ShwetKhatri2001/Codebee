import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});

export const getAll = async () => (
    await instance.post('users/all')
);

export const register = async (name, email, password, phone, agency, role) => (
    await instance.post('users/register', { name, email, password, phone, agency, role })
);

export const confirmRegister = async id => (
    await instance.post(`users/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('users/forgotpassword', { email })
);

export const confirmReset = async (id, password) => (
    await instance.post(`users/resetpass/${id}`, { password })
);

export const login = async (email, password) => (
    await instance.post('users/login', { email, password })
);

export const googleLogin = async (user) => {
    return await instance.post('users/googleLogin', user)
}

export const githubLogin = async (code) => {
    return await instance.post('users/githublogin', code);
}

export const sawoLogin = async (payload) => {
    return await instance.post('users/sawoLogin', payload)
}

export const logout = async token => (
    await instance.post('users/logout', { token })
);

export const edit = async (userID, name, email) => (
    await instance.post('users/edit', { userID, name, email })
);

export const getCourse = async id => (
    await instance.get(`course/getCourse/${id}`)
);

export const getCourseItem = async id => (
    await instance.get(`course/courseItem/${id}`)
)

export const getAllComments = async parentCourseItemId => (
    await instance.get(`comment/getAllComments/${parentCourseItemId}`)
)