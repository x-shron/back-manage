import axios from 'axios';

const instance = axios.create({
    timeout: 1000,
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        config.headers.common.Authorization = token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        if (response.status === 200) {
            return response.data;
        } else {
            return response;
        }
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default instance;
