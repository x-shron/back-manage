import { SERVER_URL } from './config.properties';
import routes from './src/router';
import { defineConfig } from 'umi';
const path = require('path');

export default defineConfig({
    extraBabelPlugins: [],
    nodeModulesTransform: {
        type: 'none',
    },
    // layout: false,
    hash: true,
    dynamicImport: {
        loading: '@/pageLoading',
    },
    routes: [
        {
            path: '/login',
            component: '@/pages/login',
        },
        {
            path: '/',
            redirect: '/matchmaker',
        },
        {
            path: '/',
            // component: '@/layouts/index',
            routes: routes,
        },
    ],
    devServer: { port: 8007 },
    proxy: {
        '/api': {
            target: SERVER_URL,
            changeOrigin: true,
            pathRewrite: {},
        },
    },
    chainWebpack(memo, args) {
        memo.output.path(
            path.resolve(
                __dirname,
                '../',
                './xindOnline/src/main/resources/static',
            ),
        );
    },
});
