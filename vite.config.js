import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; 


// https://vite.dev/config/
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
  })


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
