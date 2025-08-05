/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

//. import 'primeicons/primeicons.css'


import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

import router from './router'

const app = createApp(App)


app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.use(router) 

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)

app.mount('#app')