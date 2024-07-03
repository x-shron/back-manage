import { DownCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useState } from 'react';

const logoImg = require('@/assets/logo.png');

const Header = () => {
    const [account, setAccount] = useState('');

    const logout = () => {
        window.sessionStorage.setItem('AUTH_TOKEN', '');
        window.location.href = `/login`;
    };
    const content = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                    退出登录
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="layouts-header">
            <div className="left">
                <div className="logo-img">
                    <img src={logoImg} alt="" />
                    Heart-admin
                </div>
            </div>
            <div className="right">
                <Dropdown overlay={content}>
                    <div className="right sign-out-text">
                        <div className="account">{account || 'admin'}</div>
                        <div className="operation">
                            <DownCircleOutlined />
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
