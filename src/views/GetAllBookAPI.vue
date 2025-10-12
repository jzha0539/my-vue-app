<template>
  <div class="container py-4">
    <h1>GetAllBookAPI</h1>
    <div v-if="error" class="text-danger">{{ error }}</div>
    <pre v-else class="bg-dark text-light p-3 rounded" style="white-space: pre-wrap;">{{ json }}</pre>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'GetAllBookAPI',
  data: () => ({ json: '', error: null }),
  async mounted() {
    try {
      const url = 'https://getallbooks-vhvgxmyuwq-uc.a.run.app'
      const { data } = await axios.get(url)
      this.json = JSON.stringify(data, null, 2)
    } catch (e) {
      this.error = e.response?.data?.error || e.message
    }
  }
}
</script>