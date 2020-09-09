import Vue from 'vue';
import Cookies from 'js-cookie';
import 'normalize.css/normalize.css'; // 初始化默认样式
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // 全局样式
import gtui from '@framework/ui';
import api from '@/api/index';
import './icons';
import './permission';
// import './components/CommonCom/index';
import { EventBus, Browser } from '@framework/utils';
import { AppEventTypeEnum } from '@framework/enums';
import { Settings } from '@/config';

import store from './store';
import App from './App';
// import './registerServiceWorker';
import router from './router';
import * as filters from './filters';
import directives from './directives';

const { toLogin, toApp } = Browser;


if (process.env.NODE_ENV === 'development') { // 开发环境添加MOCK数据
  require('./mock');
}

Vue.use(gtui);
Vue.use(api);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(directives);

Vue.config.productionTip = false;
Vue.use(Element, {
  size: Cookies.get('size') || 'mini'
});

Vue.mixin({
  computed: {
    Enums() {
      return this.$store.state.dict.enums;
    }
  },
  methods: {
    getEnum() {
      //
    }
  }
});

EventBus.$on(AppEventTypeEnum.LOGIN_OUT, () => {
  store.dispatch('user/logout');
});

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('dict/getDict');
  },
  render: h => h(App)
}).$mount('#app');

window.Vue = Vue;
