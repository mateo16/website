import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // install modules
    const modules = Object.values(import.meta.globEager('./modules/*.ts'))
    modules.map(i => i.install?.({ app, router, routes, isClient, initialState}))
  }
)
