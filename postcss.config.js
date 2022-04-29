module.exports = {
  plugins: {
    'postcss-custom-media': {
      importFrom: [{
        customMedia: {
          // Breakpoint definitions
          '--res-mobile-legacy': 'only screen and (max-width: 320px)',
          '--res-mobile': 'only screen and (min-width: 321px) and (max-width: 576px)',
          '--res-desktop': 'only screen and (min-width: 577px) and (max-width: 1439px)',
          '--res-desktop-large': 'only screen and (min-width: 1440px)',

          // Device orientation
          '--landscape': '(orientation: landscape)',
          '--portrait': '(orientation: portrait)',

          // Mouse/trackpad capabilities
          '--hover': '(hover: hover)',

          // Light/dark mode
          '--light': '(prefers-color-scheme: light)',
          '--dark': '(prefers-color-scheme: dark)'
        }
      }]
    }
  },
}
