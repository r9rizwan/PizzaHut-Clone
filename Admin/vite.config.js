import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { resolve } from "path";
const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: root }],
  },
})
