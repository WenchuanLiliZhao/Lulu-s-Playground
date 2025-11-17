import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { assetsPath, basePath } from './src/basePath.netlify'

// Vite config for Netlify deployment
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'html') {
        return assetsPath + filename
      }
      return { relative: true }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // Use modern Sass API
      }
    }
  },
  build: {
    outDir: 'dist-net',
  }
})

