import { ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'

export function install({ app, initialState }: ViteSSGContext) {
  const pinia = createPinia()
  app.use(pinia)

  pinia.state.value = (initialState.pinia) || {}
}
