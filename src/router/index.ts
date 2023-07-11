import { createRouter, createWebHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../components/SignUp.vue'
import AgeCalculator from '../components/AgeCalculator.vue'
// import path from 'path'
import productForm from '../components/productForm.vue'
import ParentCom from '../views/ParentCom.vue'
import Parent from '../views/Parent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/casio',
      name: 'casio',
      component: AgeCalculator

    },
    {
      path:'/product',
      name: 'product',
      component:productForm
    },
    {
      path:'/parentCom',
      name:'parentCom',
      component:ParentCom

    },
    {
      path:'/parent',
      name:'parent',
      component:Parent
    }
  ]
})

export default router
