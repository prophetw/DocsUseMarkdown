import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  access: {},
  model: {},
  initialState: {},
  request: {},
  history: {
    type: 'hash'
  },
  layout: {
    title: 'Luban MotorSDK',
  },
  copy: [
    { from: 'public', to: 'dist' },
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '概述',
      path: '/home',
      component: './Home',
    },
    {
      name: '使用指南',
      path: '/guide',
      component: './Guide',
    },
    {
      name: '更新日志',
      path: '/updates',
      routes: [],
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'pnpm',
});

