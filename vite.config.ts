import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'vite-plugin-components'
import Compression from 'vite-plugin-compression'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItAttrs from 'markdown-it-attrs'
import path from 'path'
import yaml from '@rollup/plugin-yaml'
import grayMatter from 'gray-matter'
import { readFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Components({
      extensions: ['vue', 'md'],
      customLoaderMatcher: (path) => path.endsWith('.md'),
    }),
    Compression(),
    Layouts(),
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const mdpath = path.resolve(__dirname, route.component.slice(1))
        if (mdpath.endsWith('.md')) {
          const md = readFileSync(mdpath, 'utf-8')
          const { data } = grayMatter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        return route
      }
    }),
    Markdown({
      // wrapperComponent: 'PostWrapper',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(MarkdownItAttrs)
        md.use(MarkdownItAnchor, {
          level: 1,
          permalink: MarkdownItAnchor.permalink.headerLink(),
        })
      },
    }),
    yaml()
  ]
})
