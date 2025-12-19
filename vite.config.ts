import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src", "assets"),
      "@types": resolve(__dirname, "src", "types"),
      "@components": resolve(__dirname, "src", "components"),
      "@utils": resolve(__dirname, "src", "utils"),
      "@hooks": resolve(__dirname, "src", "hooks"),
      "@stores": resolve(__dirname, "src", "stores"),
      "@api": resolve(__dirname, "src", "api"),
    },
  },
});
