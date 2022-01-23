import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import ViteCompression from 'vite-plugin-compression'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import path from 'path'
import yaml from '@rollup/plugin-yaml'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    ViteComponents(),
    ViteCompression(),
    Layouts(),
    Pages({
      extensions: ['vue', 'md'],
      // extendRoute(route) {
      //   const path = resolve(__dirname, route.component.slice(1))
      //   if (path.endsWith('.md')) {
      //     const md = fs.readFileSync(path, 'utf-8')
      //     const { data } = matter(md)
      //     route.meta = Object.assign(route.meta || {}, { frontmatter: data })
      //   }
      //   return route
      // },
    }),
    yaml()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  }
})
