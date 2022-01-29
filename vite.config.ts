import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import ViteCompression from 'vite-plugin-compression'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-md'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItAttrs from 'markdown-it-attrs'
import path from 'path'
import yaml from '@rollup/plugin-yaml'

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
    ViteComponents({
      extensions: ['vue', 'md'],
      customLoaderMatcher: (path) => path.endsWith('.md'),
    }),
    ViteCompression(),
    Layouts(),
    Pages({
      extensions: ['vue', 'md']
      // extendRoute(route) {
      //   const mdpath = path.resolve(__dirname, route.component.slice(1))
      //   if (mdpath.endsWith('.md')) {
      //     const md = fs.readFileSync(path, 'utf-8')
      //     const { data } = matter(md)
      //     route.meta = Object.assign(route.meta || {}, { frontmatter: data })
      //   }
      //   return route
      // }
    }),
    Markdown({
      wrapperComponent: 'PostWrapper',
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
