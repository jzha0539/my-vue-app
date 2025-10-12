<template>
  <div class="container py-4">
    <h1>Weather</h1>

    <div class="card p-3 mb-3">
      <div class="d-flex gap-2">
        <input v-model="city" class="form-control" placeholder="e.g. Clayton, AU" />
        <button class="btn btn-primary" @click="getByCity">Search</button>
        <button class="btn btn-outline-secondary" @click="getByGeo">Use my location</button>
      </div>
    </div>

    <div v-if="error" class="text-danger mb-2">{{ error }}</div>

    <div v-if="weather" class="card p-3">
      <h3 class="mb-1">{{ weather.name }}</h3>
      <div class="d-flex align-items-center gap-3">
        <img v-if="iconUrl" :src="iconUrl" alt="icon" />
        <div>
          <div class="fs-3">{{ Math.round(weather.main.temp) }} °C</div>
          <div class="text-muted">{{ weather.weather[0].description }}</div>
        </div>
      </div>
    </div>

    <p v-else class="text-muted">Click the button to fetch.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WeatherView',
  data() {
    return {
      city: 'Clayton, AU',
      weather: null,
      error: null,
    }
  },
  computed: {
    iconUrl() {
      if (!this.weather) return null
      const icon = this.weather.weather?.[0]?.icon
      return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null
    }
  },
  methods: {
    async getByCity() {
      this.error = null; this.weather = null
      try {
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const { data } = await axios.get(url, {
          params: {
            q: this.city,
            units: 'metric',
            appid: process.env.VUE_APP_OPENWEATHER_KEY,
          }
        })
        this.weather = data
      } catch (e) {
        this.error = e.response?.data?.message || e.message
      }
    },
    async getByGeo() {
      this.error = null; this.weather = null
      if (!navigator.geolocation) {
        this.error = 'Geolocation not supported'; return
      }
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords
          const url = 'https://api.openweathermap.org/data/2.5/weather'
          const { data } = await axios.get(url, {
            params: { lat, lon, units: 'metric', appid: process.env.VUE_APP_OPENWEATHER_KEY }
          })
          this.weather = data
        } catch (e) {
          this.error = e.response?.data?.message || e.message
        }
      }, (err) => {
        this.error = err.message || 'Location denied'
      })
    }
  }
}
</script>