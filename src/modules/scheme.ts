import { ViteSSGContext } from 'vite-ssg'
import { ColorSchemeManager }  from '@/lib/colorScheme'
import themes from '@/config/themes.yml'
import { getAppConfig } from '@/lib/config'

const config = getAppConfig()

export const install = ({ app }: ViteSSGContext) => {
  const schemeManager = new ColorSchemeManager(themes[config.appTheme])

  app.config.globalProperties.$colorSchemeManager = schemeManager
  app.provide('colorSchemeManager', schemeManager)

  // color scheme defaults to auto
  schemeManager.setAuto()
}
