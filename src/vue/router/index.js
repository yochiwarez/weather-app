import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '../views/main.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: main
  },
  {
    path: '/inventario',
    name: 'Inventario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "inventario" */ '../views/inventario.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
