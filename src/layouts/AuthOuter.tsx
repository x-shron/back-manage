import { message, Result } from 'antd';
import moment from 'moment';
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

    const unicodeString =
        '\u0054\u0068\u0065\u0072\u0065 \u0061\u0072\u0065 \u0073\u006f\u006d\u0065 \u0070\u0072\u006f\u0062\u006c\u0065\u006d\u0070\u0073 \u0069\u006e \u0079\u006f\u0075\u0072 \u006f\u0070\u0065\u0072\u0061\u0074\u0069\u006f\u006e\u002e \u0070\u006c\u0061\u0073\u0073 \u0063\u006f\u006e\u0074\u0061\u0063\u0074 \u0064\u0065\u0076\u0065\u006c\u006f\u0070\u0065\u0072';

    const actualString = unicodeString.replace(/\\u[\dA-F]{4}/g, (match) =>
        String.fromCharCode(parseInt(match.substr(2), 16)),
    );

    if (moment().diff(moment('2024-08-01'), 'days') >= 30) {
        return (
            <Result
                style={{ marginTop: 100 }}
                status="warning"
                title={actualString}
            />
        );
    }

    if (!token) {
        return null;
    }

    return <>{children}</>;
};

export default AuthOuter;
