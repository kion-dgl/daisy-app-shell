import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: 'https://kion-dgl.github.io',
  base: '/daisy-app-shell',
  integrations: [tailwind(), db()]
});