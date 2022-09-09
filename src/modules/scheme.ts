import { ViteSSGContext } from 'vite-ssg'
import { ColorSchemeManager }  from '@/lib/colorScheme'
import themes from '@/config/themes.yml'

export const install = ({ app }: ViteSSGContext) => {
  // const schemeManager = new ColorSchemeManager(themes.default)
  const schemeManager = new ColorSchemeManager(themes.superuva)

  app.config.globalProperties.$colorSchemeManager = schemeManager
  app.provide('colorSchemeManager', schemeManager)

  // color scheme defaults to auto
  schemeManager.setAuto()
}
