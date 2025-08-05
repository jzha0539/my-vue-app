<template>
  <section class="py-5 text-center">
    <h1 class="display-6 mb-3">Access denied</h1>
    <p class="lead text-muted">Please log in to continue.</p>
    <router-link
      class="btn btn-primary mt-3"
      :to="{ name: 'Login', query: { redirect: $route.fullPath } }"
    >
      Go to Login
    </router-link>
  </section>
</template>

<script setup></script>