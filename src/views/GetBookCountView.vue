<template>
  <div class="container py-4">
    <h1>Book Counter</h1>

    <button class="btn btn-primary" @click="getBookCount">Get Book Count</button>

    <p class="mt-3" v-if="count !== null">Total number of books: {{ count }}</p>
    <p class="mt-3 text-muted" v-else>Click the button to fetch.</p>

    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetBookCountView',
  data() {
    return {
      count: null,
      error: null,
    }
  },
  methods: {
    async getBookCount() {
      this.error = null
      this.count = null
      try {
        const url = 'https://countbooks-vhvgxmyuwq-uc.a.run.app'
        const res = await axios.get(url)
        this.count = res.data.count
      } catch (err) {
        console.error(err)
        this.error = 'Failed to fetch count'
      }
    },
  },
}
</script>