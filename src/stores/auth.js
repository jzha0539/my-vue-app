import { ref, computed } from 'vue'

const HARD_CODED = { username: 'ZJY', password: 'ZJYlibrary123!!!' }

export const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
export const isAuthenticated = computed(() => !!user.value)

export function login(username, password) {
  if (username === HARD_CODED.username && password === HARD_CODED.password) {
    user.value = { username }
    localStorage.setItem('auth_user', JSON.stringify(user.value))
    return { ok: true }
  }
  return { ok: false, message: 'Invalid username or password' }
}

export function logout() {
  user.value = null
  localStorage.removeItem('auth_user')
}