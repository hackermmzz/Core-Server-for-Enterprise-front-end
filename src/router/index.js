import { createRouter, createWebHistory } from 'vue-router'

import welcome from '../components/welcome.vue'
import login_register from '../components/login_register.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import vortex from '../components/Vortex.vue'
import home from '../components/home.vue'
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: welcome
  },
    {
    path: '/login_register',
    name: 'login_register',
    component: login_register
  },
   {
    path: '/login',
    name: 'login',
    component: login
  },
   {
    path: '/register',
    name: 'register',
    component: register
  },
     {
    path: '/vortex',
    name: 'vortex',
    component: vortex
  },
       {
    path: '/home',
    name: 'home',
    component: home
  },



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
