import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          component: () => import('@/views/LoginPage.vue'),
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
          path: 'product/:id',
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
  ],
})

const isLogin = true;

router.beforeEach((to, form, next) => {
  if (
    to.name !== 'Login' &&
    to.meta?.requireAuth &&
    !isLogin
  ) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
