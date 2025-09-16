import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { isAuthenticated } from '../stores/auth'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

const routes = [
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView},
  { path: '/', name: 'Home', component: HomeView },
  
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/firelogin', name: 'FireLogin', component: FirebaseSigninView },    
  { path: '/fireregister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/denied', name: 'Denied', component: AccessDenied },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router