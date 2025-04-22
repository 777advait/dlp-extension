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
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        // Add additional pages as needed
        // options: resolve(__dirname, "options.html"),
        // background: resolve(__dirname, "src/background/index.ts"),
        // contentScript: resolve(__dirname, "src/contentScript/index.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
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
