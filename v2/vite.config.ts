import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pickalicense/catalog": fileURLToPath(new URL("./packages/catalog/src/index.ts", import.meta.url)),
      "@pickalicense/engine": fileURLToPath(new URL("./packages/engine/src/index.ts", import.meta.url))
    }
  },
  server: {
    port: 5173
  }
});
