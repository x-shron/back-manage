import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { Modal, message } from 'antd';

let instance: AxiosInstance;

export const toLogin = () => {
    window.location.href = `/login?redirect_url=${window.encodeURIComponent(
        window.location.href,
    )}`;
};

export const authCodes = [3800, 3801, 3802, 3806];
export const successCode = 0;

let modalRendered = false;

interface RequestConfig extends AxiosRequestConfig {
    showFailedMessage?: boolean;
}

export function request<T = any>(config: RequestConfig): Promise<T> {
    if (!instance) {
        instance = axios.create({
            baseURL: '/',
            timeout: 10000,
        });

        instance.interceptors.response.use(
            (res: { config: RequestConfig; data: any }) => {
                const data = res.data || {};
                if (data.code && data.code !== 200 && data.code !== '200') {
                    // @ts-ignore
                    if (
                        res.config.showFailedMessage !== false &&
                        authCodes.indexOf(data.code) === -1
                    ) {
                        message.error(data.message);
                    }
                }
                if (!modalRendered && authCodes.indexOf(data.code) > -1) {
                    modalRendered = true;
                    window.setTimeout(toLogin, 2000);
                    Modal.warning({
                        centered: true,
                        title: '提示',
                        content: '未登录或登录已过期，正在跳转到登录页...',
                        onOk: toLogin,
                    });
                }
                if (data.code !== successCode) {
                    // 约定 成功code 为 0
                    message.error(data.errorMsg);
                    return Promise.reject(data.errorMsg);
                }
                return data;
            },
            (err) => {
                message.error(err.message);
                return Promise.reject(err.message || 'Uncaught error');
            },
        );

        instance.interceptors.request.use((config) => {
            const authToken = window.sessionStorage.getItem('AUTH_TOKEN');
            if (authToken) {
                config.headers['user-id'] = authToken;
            }
            return config;
        });
    }
    // @ts-ignore
    return instance(config);
}
