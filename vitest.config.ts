import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import * as path from "path";
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    setupFiles: ["./src/__tests__/setup.ts"],
  },
})