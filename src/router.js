import Vue from 'vue'
import Router from 'vue-router'
import Champions from './views/Champions.vue'
import Champion from './views/Champion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Champions
    },
    {
      path: '/champion/:id',
      name: 'champion',
      component: Champion
    }
  ]
})
