<template>
  <nav class="d-flex justify-content-center gap-2 my-4">
    <router-link class="btn btn-outline-primary" :to="{ name: 'Home' }">
      Home
    </router-link>
    <router-link class="btn btn-outline-primary" :to="{ name: 'About' }">
      About
    </router-link>

    <router-link
      v-if="!isAuthenticated"
      class="btn btn-primary"
      :to="{ name: 'Login' }"
    >
      Login
    </router-link>
    <button v-else class="btn btn-secondary" @click="handleLogout">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../stores/auth'

const router = useRouter()
function handleLogout() {
  logout()
  router.push({ name: 'Login' })
}
</script>