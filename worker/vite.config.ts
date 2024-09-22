import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      name: 'wasmWorkerEntry',
      entry: './src/index',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        // dir: 'dist/umd',
        entryFileNames: '[name].js',
        // entryFileNames: '[name].[hash].js',
      }
    }
  }
})
