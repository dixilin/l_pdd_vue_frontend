import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/rem'
import '@styles/normalize.css'
import '@styles/reset.css'
import '@styles/iconfont.css'


import LyTab from 'ly-tab'
Vue.use(LyTab)

import plugin from '@/plugins/plugin.js'
Vue.use(plugin)

import { Lazyload } from 'vant'
Vue.use(Lazyload)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')