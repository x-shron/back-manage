import { request } from '@/utils/request';

const successCode = 200;

export const fetchAuthCode = async (params?: any) => {
    const { success, code, message, data } = await request({
        method: 'get',
        url: '/base-server-service/api/v1/authcode/newObtain',
        params,
    });
    if (!success || code !== successCode) {
        throw message;
    }
    return data;
};

export const userLogin = async (params?: any) => {
    const { data } = await request({
        method: 'post',
        url: '/api/bk/login',
        data: params,
        showFailedMessage: false,
    });
    return data;
};
