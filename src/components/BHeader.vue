<template>
  <nav class="d-flex justify-content-center gap-2 my-4">
    <router-link class="btn btn-outline-primary" :to="{ name: 'Home' }">
      Home
    </router-link>
    <router-link class="btn btn-outline-primary" :to="{ name: 'About' }">
      About
    </router-link>
    <router-link class="btn btn-outline-primary" :to="{ name: 'FireLogin' }">
      Firebase Login
    </router-link>
    <router-link class="btn btn-outline-primary" :to="{ name: 'FireRegister' }">
      Register
    </router-link>
    <router-link v-if="isLoggedIn" class="btn btn-outline-primary" :to="{ name: 'AddBook' }">
      Add Book
    </router-link>
    <router-link class="btn btn-outline-primary" :to="{ name: 'GetBookCount' }">
      Get Book Count
    </router-link>
    <router-link v-if="isLoggedIn" :to="{ name: 'GetAllBookAPI' }" class="btn btn-outline-primary mx-1" :class="{ active: $route.name === 'GetAllBookAPI' }">
      GetAllBookAPI
    </router-link>
    <router-link class="btn btn-outline-primary" to="/weather">
      Weather
    </router-link>
    <router-link v-if="!isLoggedIn" class="btn btn-primary" :to="{ name: 'Login' }">
      Login
    </router-link>
    

    <button v-else class="btn btn-secondary" @click="handleLogout">
      Logout
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { auth } from '../firebase/firebase'
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'


const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (u) => { isLoggedIn.value = !!u })
})
async function handleLogout() {
  await signOut(auth)
  router.push({ name: 'Login' })
}
</script>