import { message } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useHistory } from 'umi';

// 可用作项目的前置权限控制
const AuthOuter: React.FC<any> = ({ children }) => {
    const token = window.sessionStorage.getItem('AUTH_TOKEN');
    const history = useHistory();

    useLayoutEffect(() => {
        if (!token) {
            message.error('请先登录');
            history.push('/login');
        }
    }, []);

    if (!token) {
        return null;
    }

    return <>{children}</>;
};

export default AuthOuter;
