import NProgress from 'nprogress';
import { Settings } from '@/config';
import { Browser } from '@framework/utils';
import store from './store';
import router, { authRoutes } from './router';
/* 页面进度条 * */
import 'nprogress/nprogress.css';


const { toLogin } = Browser;

const { title: appTitle, loginUrl } = Settings;

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // 设置页面标题, tagView标题
  let { title } = to.meta;
  const { noNeedToken } = to.meta;
  if (to.meta.getTitle) {
    title = to.meta.getTitle(to);
  }

  to.meta.title = title;
  if (title) {
    document.title = `${appTitle} - ${title}`;
  } else {
    document.title = appTitle;
  }

  if (noNeedToken) {
    next();
    NProgress.done();
    return;
  }

  const { token } = store.getters;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      try {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) {
          next();
        } else {
          const { roles } = await store.dispatch('user/getRoles', JSON.parse(token));
          if (roles) {
            // 添加路由
            const addRoutes = await store.dispatch('user/generateRoutes', authRoutes);
            router.addRoutes(addRoutes);
            next({ ...to, replace: true });
          } else {
            // 不存在roles时，需要重新登录
            await store.dispatch('user/logout');
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    // next();
    toLogin(loginUrl, router);
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
