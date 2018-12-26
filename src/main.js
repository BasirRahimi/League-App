import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import $http from 'vue-resource'

Vue.config.productionTip = false

Vue.use($http)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
