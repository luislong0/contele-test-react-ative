import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactNative from "vitest-react-native";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactNative(), react()],
})
