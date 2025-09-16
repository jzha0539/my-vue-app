<template>
  <section class="py-5">
    <div class="mx-auto" style="max-width:420px">
      <h1 class="h4 mb-4 text-center">Create an Account</h1>

      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" v-model.trim="email" type="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input class="form-control" v-model="password" type="password" required />
        </div>

        <p v-if="msg" class="small" :class="ok ? 'text-success' : 'text-danger'">{{ msg }}</p>
        <button class="btn btn-primary w-100" type="submit">Save to Firebase</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const msg = ref('')
const ok = ref(false)

const register = async () => {
  msg.value = ''
  ok.value = false
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!', user)
    ok.value = true
    msg.value = 'Registered successfully'
    router.push({ name: 'FireLogin' }) 
  } catch (e) {
    console.error(e)
    msg.value = e.message || String(e)
  }
}
</script>