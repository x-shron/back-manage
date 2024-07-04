import { PieChartOutlined, TrademarkOutlined } from '@ant-design/icons';

const menuList = [
    {
        title: '红娘管理',
        icon: <TrademarkOutlined />,
        children: [
            {
                title: '红娘数据',
                path: '/matchmaker',
                children: [],
            },
            {
                title: '红娘申请',
                path: '/matchmaker-apply',
                children: [],
            },
            {
                title: '红娘关系查找',
                path: '/matchmaker-qeury',
                children: [],
            },
        ],
    },
    {
        title: '用户管理',
        icon: <TrademarkOutlined />,
        children: [
            {
                title: '用户列表',
                path: '/user-list',
                children: [],
            },
            {
                title: '用户订单',
                path: '/user-order',
                children: [],
            },
            {
                title: '用户邀约关系查询',
                path: '/user-query-relation',
                children: [],
            },
        ],
    },
    {
        title: '相亲管理',
        icon: <PieChartOutlined />,
        children: [
            {
                title: '相亲列表',
                path: '/marriage-list',
                children: [],
            },
        ],
    },
    {
        title: '系统管理',
        icon: <TrademarkOutlined />,
        children: [
            {
                title: '隐私协议',
                path: '/protocol',
                children: [],
            },
            {
                title: '封面图',
                path: '/cover-img',
                children: [],
            },
            {
                title: '帮助与客服',
                path: '/help',
                children: [],
            },
        ],
    },
    {
        title: '充值管理',
        icon: <PieChartOutlined />,
        children: [
            {
                title: 'VIP服务',
                path: '/vip-service',
                children: [],
            },
            {
                title: '线下服务',
                path: '/offline-service',
                children: [],
            },
        ],
    },
];

export default menuList;
