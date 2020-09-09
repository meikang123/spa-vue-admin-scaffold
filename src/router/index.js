import Vue from 'vue';
import VueRouter from 'vue-router';
import { Transform } from '@framework/utils';

/*
 * Layout
 * */
import Layout from '@/layout';

/**
 * @description 动态引入路由模块, 根据模块内第一个路由meta{position:1}中的position进行菜单顺序调整
 * position 越大位置越靠后
 */
const routeFiles = require.context('./modules', true, /\.js$/);
const configRoutes = Transform.configRoutesToRoutes(routeFiles);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

/*
 * 路由模块
 * */


/*
 * 路由配置
 * */
export const defaultRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'default' */ '@/views/default/login/index'),
    hidden: true,
    meta: {
      noNeedToken: true
    }
  }, {
    path: '/404',
    component: () => import(/* webpackChunkName: 'default' */ '@/views/default/404/index'),
    hidden: true,
    meta: {
      noNeedToken: true
    }
  }, {
    path: '/icon',
    component: () => import(/* webpackChunkName: 'default' */ '@/views/default/icon/index'),
    hidden: true,
    meta: {
      noNeedToken: true
    }
  }];

export const authRoutes = [{
  path: '/',
  redirect: '/index',
  component: Layout,
  children: [{
    path: 'index',
    name: 'default',
    component: () => import(/* webpackChunkName: 'default' */ '@/views/default/index/index'),
    hidden: true,
    meta: { affix: true, title: 'Welcome' }
  }]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}].concat(...configRoutes);


const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: defaultRoutes
});

export default router;
