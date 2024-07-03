import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'umi';
import menuList from '@/menus';

const MenuCustom = () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();

    function handleSelectMenu(nav: any) {
        setSelectedKeys([nav.key]);
        history.push(nav.key);
    }
    useEffect(() => {
        setSelectedKeys([history.location.pathname]);
    }, [history.location.pathname]);

    return (
        <div
            className="layouts-nav"
            style={{
                width: collapsed ? '64px' : '200px',
            }}
        >
            <div className="menu-wrapper">
                <Menu
                    mode="inline"
                    onClick={handleSelectMenu}
                    forceSubMenuRender
                    selectedKeys={selectedKeys}
                    inlineCollapsed={collapsed}
                >
                    {menuList.map((nav: any) => {
                        return nav.children.length > 0 ? (
                            <Menu.SubMenu
                                title={nav.title}
                                key={nav.path}
                                icon={nav.icon}
                            >
                                {nav.children.map((item: any) => {
                                    return (
                                        <Menu.Item
                                            key={item.path}
                                            icon={item.icon}
                                        >
                                            {item.title}
                                        </Menu.Item>
                                    );
                                })}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item key={nav.path} icon={nav.icon}>
                                {nav.title}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
            <div
                className="toggle-menu"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </div>
        </div>
    );
};

export default MenuCustom;
