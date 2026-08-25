import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'AgriLink AI',
        short_name: 'AgriLink',
        description: 'Empowering Farmers with AI',
        theme_color: '#10b981',
        background_color: '#ffffff',
        display: 'standalone',
      }
    })
  ],
})
