// 此处抛出的所有路由 也可用用于权限校验

const routes = [
    // 红娘数据
    {
        path: '/matchmaker',
        component: '@/pages/matchmaker-manage/matchmaker-list',
        exact: true,
        title: '红娘数据',
    },
    // 红娘申请
    {
        path: '/matchmaker-apply',
        component: '@/pages/matchmaker-manage/matchmaker-apply',
        exact: true,
        title: '红娘申请',
    },
    {
        path: '/marriage-list',
        component: '@/pages/matchmaker-manage/marriage-process',
        exact: true,
        title: '相亲列表',
    },
    {
        path: '/protocol',
        component: '@/pages/system/protocol',
        exact: true,
        title: '隐私与协议',
    },
    {
        path: '/help',
        component: '@/pages/system/help',
        exact: true,
        title: '帮助与客服',
    },
    {
        path: '/cover-img',
        component: '@/pages/system/cover-img',
        exact: true,
        title: '封面图',
    },

    {
        path: '/vip-service',
        component: '@/pages/recharge-service/vip',
        exact: true,
        title: 'VIP服务',
    },
    {
        path: '/offline-service',
        component: '@/pages/recharge-service/offline',
        exact: true,
        title: '线下服务',
    },
    {
        path: '/user-list',
        component: '@/pages/user-manage',
        exact: true,
        title: '用户列表',
    },
    {
        path: '/user-order',
        component: '@/pages/user-manage/user-order',
        exact: true,
        title: '用户订单',
    },
];

export default routes;
