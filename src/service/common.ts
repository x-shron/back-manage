import { request } from '@/utils/request';

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

// 職業
export const getJobMap = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/config/vocationMap',
        params,
        showFailedMessage: false,
    });
    return res.data;
};

export const getSchoolMap = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/config/school',
        params,
        showFailedMessage: false,
    });
    return res.data;
};

export const getTagMap = async (params?: any) => {
    const res = await request({
        method: 'get',
        url: '/api/config/tagsMap',
        params,
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
