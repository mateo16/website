import { ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'

export const install = ({ app, initialState }: ViteSSGContext) => {
  const pinia = createPinia()
  app.use(pinia)

  pinia.state.value = (initialState.pinia) || {}
}
