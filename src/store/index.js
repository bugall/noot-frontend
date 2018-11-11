import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);


export function createStore() {
  return new Vuex.Store({
    state: {
      // 状态

    },
    mutations: {
      // 改变方法
    },
    actions: {

    },
    modules: {
      app,
      user
    }
  });
}
