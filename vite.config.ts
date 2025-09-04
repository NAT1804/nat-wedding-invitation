import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
      "@styles": resolve(import.meta.dirname, "./src/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @use "sass:color";
          @use "@styles/base/variables" as *;
          @use "@styles/base/mixins" as *;
          @use "@styles/utils/animations" as *;
        `,
      },
    },
  },
  server: {
    port: 3001,
  },
});
