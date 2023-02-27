import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-eslint-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})
