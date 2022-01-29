import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)
console.debug('1')
console.debug(routes)
console.debug(generatedRoutes)
debugger
export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    console.debug('2')
    console.debug(router.getRoutes())
    console.debug('3')
    console.debug(routes)
    // Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))

    // ctx.app.provide('bus', eventBus)
    // ctx.app.use(store)

    // ctx.router.beforeEach((to, from) => {
    //   const newRoute = nextRoute(to.path, store.state.user.id)
    //   return store.state.user.id === undefined || newRoute === to.path ? true : newRoute
    // })
  }
)
