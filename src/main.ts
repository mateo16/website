import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))

    // ctx.app.provide('bus', eventBus)
    // ctx.app.use(store)

    // ctx.router.beforeEach((to, from) => {
    //   const newRoute = nextRoute(to.path, store.state.user.id)
    //   return store.state.user.id === undefined || newRoute === to.path ? true : newRoute
    // })
  }
)
