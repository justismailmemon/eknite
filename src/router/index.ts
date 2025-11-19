import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Workspace from '@/pages/Workspace.vue'

const routes = [
  { path: '/', redirect: '/workspace' },
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
const authPages = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  if (isAuthenticated && authPages.includes(to.path)) {
    return next('/')
  }

  next()
})

export default router

