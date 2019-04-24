import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.use(Antd)

Vue.config.productionTip = false
axios.defaults.baseURL = `https://translate.yandex.net/api/v1.5/tr.json`

export const eventBus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
