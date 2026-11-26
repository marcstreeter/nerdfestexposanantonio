import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      // Astro islands can discover these imports on different routes in dev.
      include: [
        "@radix-ui/react-accordion",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-slot",
        "@radix-ui/react-tabs",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "react",
        "tailwind-merge",
        "zustand",
        "zustand/middleware",
        "zustand/vanilla",
      ],
    },
  },
  integrations: [
    tailwind(),
    react(),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
});
