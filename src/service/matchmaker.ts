import { request } from '@/utils/request';

const successCode = 200;

export const getMatchmakerList = async (params?: any) => {
    const res = await request({
        method: 'post',
        url: '/api/bk/matchmaker/list',
        data: params,
        showFailedMessage: false,
    });
    return res.data;
};

export const getMarriageList = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/bk/job/all',
        params,
        showFailedMessage: false,
    });
    return res.data;
};

export const getUserList = async (params?: any) => {
    const res = await request({
        method: 'post',
        url: '/api/bk/user/page',
        data: params,
        showFailedMessage: false,
    });
    return res.data;
};

export const deleteUser = async (id: any) => {
    const res = await request({
        method: 'delete',
        url: `/api/user/${id}`,
        showFailedMessage: false,
    });
    return res.data;
};

export const unbindUser = async (params: any) => {
    const res = await request({
        method: 'get',
        url: `/api/bk/user/unbind`,
        showFailedMessage: false,
        params,
    });
    return res.data;
};

export const bindUser = async (params: any) => {
    const res = await request({
        method: 'get',
        url: `/api/bk/user/bind`,
        params,
        showFailedMessage: false,
    });
    return res.data;
};

export const getOrderList = async (params: any) => {
    const res = await request({
        method: 'post',
        url: `/api/order/list`,
        data: params,
        showFailedMessage: false,
    });
    return res.data;
};
