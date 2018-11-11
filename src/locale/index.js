import Vue from 'vue';
import Locales from './locale';
import zhLocale from 'iview/dist/locale/zh-CN';
import enLocale from 'iview/dist/locale/en-US';

// 自动设置语言
let navLang = '';
let localLang = 'zh-cn';
let lang = 'zh-ch';

if (typeof navigator !== 'undefined') {
  navLang = navigator.language;
  localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
  lang = window.localStorage.lang || localLang || 'zh-CN';
}

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
