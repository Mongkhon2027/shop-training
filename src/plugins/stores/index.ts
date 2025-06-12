import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import { useCounterStore } from './counter'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

export { useCounterStore }
export default pinia
