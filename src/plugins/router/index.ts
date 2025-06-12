// import path = require('path')
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/HomeView.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/AboutView.vue'),
    // },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import('@/layouts/BlankLayout.vue'),
      children :[
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/LoginPage.vue'), // Change path to Login Page
        },
      ]
    },
    {
      path: '/default',
      component: () => import('@/layouts/DefaultLayout.vue'),
      meta: { requireAuth: true },
      children :[
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'products/:id',
          name: 'ProductPage',
          component: () => import('@/views/ProductDetailView.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/CartView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage.vue')
    },
  ],
})

const isLogin = true;

router.beforeEach((to, form, next) => {
  if (
    to.name !== 'Login' &&
    to.meta?.requireAuth &&
    !isLogin
  ) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
