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
  private _colorScheme: ColorScheme = ColorScheme.auto
  private _darkModeMediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  private _colorSchemeConfig: ColorSchemeConfig

  constructor(config: ColorSchemeConfig) {
    this._colorSchemeConfig = config
    this._darkModeMediaQuery.addEventListener('change', () => {
      if (this.colorScheme === ColorScheme.auto) {
        // refresh scheme to sync it with system preference
        this.applyColorScheme(ColorScheme.auto)
      }
    })
  }

  get isDarkModeActive() { return this._darkModeMediaQuery.matches }

  get colorScheme() { return this._colorScheme }

  set colorScheme(scheme: ColorScheme) {
    if (this._colorScheme !== scheme) {
      this.applyColorScheme(scheme)
      this._colorScheme = scheme
      // TODO: emit event
    }
  }

  setDark() { this.colorScheme = ColorScheme.dark }
  setLight() { this.colorScheme = ColorScheme.light }
  setAuto() { this.colorScheme = ColorScheme.auto }

  private applyColorScheme(scheme: ColorScheme) {
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
