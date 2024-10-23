import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({}),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: { cleanupNumericValues: false, removeViewBox: false },
            },
          },
          "sortAttrs",
          {
            name: "addAttributesToSVGElement",
            params: { attributes: [{ xmlns: "http://www.w3.org/2000/svg" }] },
          },
        ],
      },
      png: { quality: 100 },
      jpeg: { quality: 100 },
    }),
    ViteImageOptimizer({
      // Configuraciones personalizadas
    }),
  ],
  server: {
    https: true,
    port: 443,
  },
});
