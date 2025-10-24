import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/**/*', 'src/index.ts', 'src/styles/**/*'],
      exclude: ['src/playground', 'src/debug', '**/*.test.tsx', '**/*.test.ts'],
      outDir: 'dist',
      insertTypesEntry: true,
    }),
  ],
  publicDir: false, // Disable copying public directory
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // Use modern Sass API
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LululemonUI',
      formats: ['es', 'umd'],
      fileName: (format) => `lululemon-ui.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        // Export styles alongside JS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'lululemon-ui.css'
          return assetInfo.name || 'asset'
        },
      },
    },
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
  },
})

