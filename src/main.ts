import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { trackError } from '@/lib/analytics'
import copy from '@/assets/copy/en/app.yml'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    if (isClient) {
      // install modules
      const modules = Object.values(import.meta.globEager('./modules/*.ts'))
      modules.map(i => i.install?.({ app, router, routes, isClient, initialState}))

      // add fallback 404 redirect
      router.addRoute({
        path: '/:pathMatch(.*)',
        name: 'not-found',
        redirect: '/404'
      })

      // global error handler
      app.config.errorHandler = (err) => {
        const message = err instanceof Error ? err.message : err as string
        console.error(message)

        // notify user
        app.config.globalProperties.$eventBus.notify(copy.error.globalHandler, '😵')

        // log analytics event
        trackError(message)
      }
    }
  }
)
