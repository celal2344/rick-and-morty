import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'jquery',
      'bootstrap',
      'bootstrap-table',
      'core-js/modules/es.array.concat.js',
      'core-js/modules/es.array.filter.js',
      'core-js/modules/es.object.to-string.js',
      'core-js/modules/web.dom-collections.iterator.js',
    ],
  },
})
