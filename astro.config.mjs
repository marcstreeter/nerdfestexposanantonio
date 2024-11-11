import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
});
