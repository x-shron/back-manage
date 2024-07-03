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
export const getAreaAndCity = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/config/districtCodeMap',
        params,
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

// 用户角色
export const getUserRoleMap = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/config/roleMap',
        params,
        showFailedMessage: false,
    });
    return res.data;
};
