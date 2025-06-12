import router from './router'
import stores from './stores'
import vuetify from './vuetify'
import { type App } from 'vue'

export const registerPlugins = (app: App) => {
  app.use(router)
  app.use(stores)
  app.use(vuetify)
}
