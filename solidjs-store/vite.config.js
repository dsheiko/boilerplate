import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    outDir: "build",
    target: "esnext"
  },
  resolve: {
    alias: {
      src: "/src"
    }
  }
});
