import { createApp } from 'vue'
import App from './App'
import { plugin as PortalVue } from 'portal-vue/dist/portal-vue.esm'

const app = createApp(App);
app.use(PortalVue)
app.mount('#app')
