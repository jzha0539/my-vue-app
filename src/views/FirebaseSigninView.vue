<template>
  <section class="py-5">
    <div class="mx-auto" style="max-width:420px">
      <h1 class="h4 mb-4 text-center">Sign in</h1>

      <form @submit.prevent="signin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" v-model.trim="email" type="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input class="form-control" v-model="password" type="password" required />
        </div>

        <p v-if="msg" class="small" :class="ok ? 'text-success' : 'text-danger'">{{ msg }}</p>
        <button class="btn btn-primary w-100" type="submit">Sign in via Firebase</button>
        <button class="btn btn-secondary w-100 mt-2" type="button" @click="doLogout">Logout</button>

        <p class="text-muted small mt-3">Open DevTools Console to see current user.</p>

        <p class="small mt-2">No account?<router-link :to="{ name: 'FireRegister' }">Create one</router-link></p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const msg = ref('')
const ok = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    console.log('🔥 current user:', user) // 作业要求：控制台展示当前用户
  })
})

const signin = async () => {
  msg.value = ''
  ok.value = false
  try {
    const { user } = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Login successful:', user)
    ok.value = true
    msg.value = 'Logged in'
    router.push('/') 
  } catch (e) {
    console.error(e)
    msg.value = e.message || String(e)
  }
}

const doLogout = async () => {
  await signOut(auth)
  console.log('👋 logged out, current user:', auth.currentUser) 
  ok.value = true
  msg.value = 'Logged out'
}
</script>