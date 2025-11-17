import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { assetsPath, basePath } from './src/basePath.netlify'

// Vite config for Netlify deployment
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
  resolve: {
    alias: {
      // Replace basePath.ts with basePath.netlify.ts for Netlify builds
      './basePath.ts': path.resolve(__dirname, './src/basePath.netlify.ts'),
      './basePath': path.resolve(__dirname, './src/basePath.netlify.ts'),
    }
  },
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

