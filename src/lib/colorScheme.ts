import { inject } from 'vue'
import { setCssVariable } from "./utils"

type ColorSchemeVariable = { string: string }
type ColorSchemeConfig = { [name: string]: ColorSchemeVariable }

export enum ColorScheme {
  light = 'light',
  dark = 'dark',
  auto = 'auto'
}

export class ColorSchemeManager {
  private _colorScheme = ColorScheme.auto
  private _darkModeMediaQuery: MediaQueryList
  private _colorSchemeConfig: ColorSchemeConfig

  constructor(config: ColorSchemeConfig) {
    this._colorSchemeConfig = config
    this._darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // initialize by following OS active color scheme
    this.apply(ColorScheme.auto)

    // reapply scheme when OS changes it
    this._darkModeMediaQuery.addEventListener('change', () => {
      if (this.colorScheme === ColorScheme.auto) {
        // refresh scheme to sync it with system preference
        this.apply(ColorScheme.auto)
      }
    })
  }

  get isDarkModeActive() { return this._darkModeMediaQuery.matches }

  get colorScheme() { return this._colorScheme }

  set colorScheme(scheme: ColorScheme) {
    if (this._colorScheme !== scheme) {
      this.apply(scheme)
      this._colorScheme = scheme
      // TODO: emit event
    }
  }

  setDark() { this.colorScheme = ColorScheme.dark }
  setLight() { this.colorScheme = ColorScheme.light }
  setAuto() { this.colorScheme = ColorScheme.auto }

  private apply(scheme: ColorScheme) {
    const activeScheme = scheme === ColorScheme.auto
      ? (this.isDarkModeActive ? ColorScheme.dark : ColorScheme.light)
      : scheme

    const config = this._colorSchemeConfig[activeScheme as keyof ColorSchemeConfig]
    for (const variableName in config) {
      const value = config[variableName as keyof ColorSchemeVariable]
      setCssVariable(variableName, value)
    }
  }
}

export const useColorSchemeManager = () => {
  return inject<ColorSchemeManager>('colorSchemeManager') as ColorSchemeManager
}
