import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import marks from '../components/StudentMarks.vue'
import Learn from '../views/Learned.vue'
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
    // {
    //   path:'/marks',
    //   name:'marks',
    //   component:marks
    // },
    {
      path:'/Learn',
      name:'Learn',
      component:Learn
    }
  ]
})

export default router
