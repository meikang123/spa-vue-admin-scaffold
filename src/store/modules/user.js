import { Api } from '@/api';
import { APP_AUTH_TOKEN } from '@framework/config/consts';
import { Browser } from '@framework/utils';
import { Settings } from '@/config';

const { toLogin } = Browser;

/*
* 获取登录信息
* */
const getToken = () => window.localStorage.getItem(APP_AUTH_TOKEN);

/*
* 删除登录信息
* */
const delToken = () => {
  window.localStorage.removeItem(APP_AUTH_TOKEN);
};


function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  }
  return true;
}

/*
* 路由过滤器
* */
const filterRoutes = (routes, roles) => {
  const res = [];
  routes.forEach(route => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = filterRoutes(route.children, roles);
      }
      res.push(route);
    }
  });

  return res;
};

const getters = {
  roleId: state => state.info.role_id,
  isAdmin: state => state.info.role_id === 1
};

const mutations = {
  CHANGE_USER: (state, info) => {
    state.info = info;
    state.token = getToken();
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      Api.User.doLogin({ name: username, password }).then(res => {
        if (res.code === 0) {
          commit('CHANGE_USER', res.data);
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      Api.User.goLogout().then(res => {
        if (res.code === 0) {
          delToken();
          toLogin(Settings.loginUrl);
          commit('CHANGE_USER', {});
          resolve();
        } else {
          reject(res);
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      delToken();
      commit('CHANGE_USER', {});
      resolve();
    });
  },

  getRoles({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      commit('CHANGE_USER', info);
      const { role_id } = info;
      commit('SET_ROLES', [role_id]);
      resolve(state);
    });
  },
  generateRoutes({ commit, state }, authRoutes) {
    return new Promise(resolve => {
      const addRoute = filterRoutes(authRoutes, state.roles);
      commit('SET_ROUTES', addRoute);
      resolve(addRoute || []);
    });
  }
};

const state = {
  token: getToken(),
  info: {}, // 用户信息
  roles: null,
  routes: []
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
