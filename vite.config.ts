import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@lib": resolve(__dirname, "./src/lib"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@scripts": resolve(__dirname, "./src/scripts"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        content: resolve(__dirname, "src/scripts/content.ts"),
        background: resolve(__dirname, "src/scripts/background.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          // Don't add hash to content and background scripts
          if (chunk.name === "content" || chunk.name === "background") {
            return `scripts/[name].js`;
          }
          return `assets/${chunk.name}/[name].[hash].js`;
        },
        chunkFileNames: "assets/js/[name].[hash].js",
        assetFileNames: (info) => {
          const { name } = info;
          if (/\.(jpe?g|png|gif|svg|webp)$/.test(name ?? "")) {
            return "assets/images/[name].[hash][extname]";
          }
          if (/\.(css)$/.test(name ?? "")) {
            return "assets/css/[name].[hash][extname]";
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== "production",
  },
});
