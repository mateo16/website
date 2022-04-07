import { ViteSSGContext } from 'vite-ssg'
import { ColorSchemeManager, ColorScheme }  from '@/lib/colorScheme'
import colorSchemes from '../../config/colorSchemes.yml'

export function install({ app }: ViteSSGContext) {
  // create global color scheme manager instance
  const schemeManager = new ColorSchemeManager(colorSchemes)

  app.config.globalProperties.$colorSchemeManager = schemeManager
  app.provide('colorSchemeManager', schemeManager)

  // color scheme defaults to auto
  schemeManager.colorScheme = ColorScheme.auto
}
