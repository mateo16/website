import { ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'

export function install({ app, isClient, initialState }: ViteSSGContext) {
  if (!isClient) {
    return
  }

  const pinia = createPinia()
  app.use(pinia)

  pinia.state.value = (initialState.pinia) || {}
}
