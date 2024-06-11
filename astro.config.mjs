import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: 'https://kion-dgl.github.io',
  integrations: [tailwind(), react(), db()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  experimental: {
    actions: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["astro:db"]
    }
  }
});