import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入echarts
import echarts from 'echarts'
import wpkReporter from 'wpk-reporter' // 导入基础sdk
const __wpk = new wpkReporter({
  bid: '8sfk7rk3-v22lqxg1', // 新建应用时确定
  plugins: []
})

__wpk.installAll() // 初始化sdk 必须调用

// 挂载到vue原型
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
