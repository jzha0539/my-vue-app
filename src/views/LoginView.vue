<template>
  <section class="py-5">
    <div class="mx-auto" style="max-width: 420px">
      <h1 class="h3 mb-4 text-center">Login</h1>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" v-model.trim="form.username" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="form.password" required />
        </div>

        <p v-if="error" class="text-danger small mb-3">{{ error }}</p>

        <button type="submit" class="btn btn-primary w-100">Login</button>
        <p class="text-muted small mt-3">
          Demo account: <code>librarian</code> / <code>library123</code>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../stores/auth'

const router = useRouter()
const route = useRoute()

const form = reactive({ username: '', password: '' })
const error = ref('')

function onSubmit() {
  const res = login(form.username, form.password)
  if (res.ok) {
    const redirect = route.query.redirect || { name: 'About' }
    router.replace(redirect)
  } else {
    error.value = res.message
  }
}
</script>