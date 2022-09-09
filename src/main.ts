import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { trackError } from '@/lib/analytics'
import copy from 'assets/copy/en/app.yml'

// global stylesheets
import 'assets/css/typeface.css'
import 'assets/css/styles.css'
import 'assets/css/global.css'
import 'assets/css/animations.css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes,
    scrollBehavior: (to) => to.hash ? { el: to.hash } : { top: 0 }
  },
  (ctx) => {
    if (ctx.isClient) {
      // install modules
      const modules = Object.values(import.meta.globEager('./modules/*.ts'))
      modules.map(i => i.install?.(ctx))

      // add fallback 404 redirect
      ctx.router.addRoute({
        path: '/:pathMatch(.*)',
        name: 'not-found',
        redirect: '/404'
      })

      // global error handler
      ctx.app.config.errorHandler = (err) => {
        const message = err instanceof Error ? err.message : err as string
        console.error(message)

        // notify user
        ctx.app.config.globalProperties.$eventBus.notify(copy.error.globalHandler, '😵')

        // log analytics event
        trackError(message)
      }
    }
  }
)
