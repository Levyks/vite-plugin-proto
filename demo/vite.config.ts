import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import proto from 'vite-plugin-proto'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(), 
    proto()
  ],
})
