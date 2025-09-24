import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI animation libraries (Framer Motion is large, separate it)
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react', 'react-icons'],

          // Other UI libraries
          'ui-utils-vendor': ['react-toastify'],

          // Animation libraries
          'animation-vendor': ['gsap'],

          // HTTP and real-time libraries
          'network-vendor': ['axios', 'socket.io-client'],

          // Styling (TailwindCSS v4 handles this differently)
          // 'styling-vendor': ['tailwindcss'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Slightly increase the warning limit
    // Additional optimizations
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true, // Remove console.log in production
    //     drop_debugger: true,
    //   },
    // },
    sourcemap: false, // Disable sourcemaps for smaller bundles
  },
})
