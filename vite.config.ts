import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Stamped at build time → shown as "Last updated" in the footer.
  define: {
    __BUILD_DATE__: JSON.stringify(
      new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    ),
  },
  server: {
    host: "0.0.0.0",
  },
});
