import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoImport from 'unplugin-auto-import/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vueDevTools(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        {
          vuetify:['useDisplay']
        }
      ],
      dts: './auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
   vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/vuetify.scss',
      },
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/variable' as *;
          @use '@/styles/mixin' as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
})
