import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
// import filterValue from '../src/filterMarks'
// const app = createApp(App)

// app.use(router)


const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(router)


app.mount('#app')