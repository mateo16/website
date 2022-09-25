import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'
import { trackError } from '@/lib/analytics'
import copy from 'assets/copy/en/app.yml'
import { type ViteSSGContext } from 'vite-ssg'

// global stylesheets
import 'assets/css/typeface.css'
import 'assets/css/styles.css'
import 'assets/css/global.css'
import 'assets/css/animations.css'

type UserModule = (ctx: ViteSSGContext) => void

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes,
    scrollBehavior: (to) => to.hash ? { el: to.hash } : { top: 0 }
  },
  (ctx) => {
    if (ctx.isClient) {
      // install modules
      Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

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

    // console.debug(window)
    // process.exit(2)
  }
)
