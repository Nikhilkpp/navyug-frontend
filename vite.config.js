import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Render-specific settings
  server: {
    port: 5173, // Local dev port (optional)
    strictPort: true, // Fail if port is in use
  },
  preview: {
    port: 8080, // Render's expected port
    strictPort: true, // Required for Render
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clear dist folder before build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Better asset caching
      },
    },
  },
  base: '/', // Ensure correct paths in production
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'; 


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),   
//      tailwindcss()
//     ],
//      resolve: {
//          alias: {
//            '@': path.resolve(__dirname, './src'),
//          },
// },
//   })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// // If you're using Tailwind via PostCSS (recommended), remove this line:
// // import tailwindcss from '@tailwindcss/vite' ❌ (this package doesn't exist)

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })
