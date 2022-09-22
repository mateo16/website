import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'
// import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItExternalLinks from 'markdown-it-external-links'
import path from 'path'
import SVG from 'vite-svg-loader'
import Yaml from '@rollup/plugin-yaml'
import grayMatter from 'gray-matter'
import PostCSSCustomMedia from 'postcss-custom-media'
import { readFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  // Environment variables prefix
  envPrefix: 'APSIS_',

  css: {
    postcss: {
      plugins: [
        PostCSSCustomMedia({
          importFrom: 'postcss.json'
        })
      ]
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'assets': `${path.resolve(__dirname, 'assets')}`,
    },
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: false,
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

          // expand route metadata with markdown frontmatter
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })

          // set blog posts layout automatically
          if (route.path.startsWith('/blog/')) {
            route.meta.layout = 'blog'
          }
        }
        return route
      }
    }),

    Markdown({
      headEnabled: false,
      markdownItSetup(md) {
        md.use(MarkdownItExternalLinks, {
          internalDomains: ['localhost', 'apsistechnologies.com'],
          internalTarget: '_self',
          externalTarget: '_blank'
        })
        // md.use(MarkdownItAnchor, {
        //   level: 2,
        //   permalink: MarkdownItAnchor.permalink.headerLink(),
        // })
      },
    }),

    SVG(),
    Yaml()
  ]
})
