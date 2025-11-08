import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Workspace from '@/pages/Workspace.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { 
    path: '/workspace', 
    name: 'Workspace', 
    component: Workspace,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') // redirect to login page if not logged in
  } else {
    next() // proceed to route
  }
})

export default router
