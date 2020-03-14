import Vue from 'vue'
import App from './App'
import store from './store'
import validate from './js_sdk/fshjie-formvalidate/ys-validate.js'
import moment from 'moment'
Vue.config.productionTip = false
Vue.prototype.$validate = validate

// 注册时间过滤器
Vue.filter('datefmt',function(val){
  if(val){
     return moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
    return val;   
})

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
