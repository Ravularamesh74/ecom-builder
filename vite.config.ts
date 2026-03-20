import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // better than "::"
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()], // ❌ removed lovable-tagger (causing warning)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});