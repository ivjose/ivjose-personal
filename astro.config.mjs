import image from '@astrojs/image';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      // config: { applyBaseStyles: false },
    }),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    prefetch(),
    react(),
  ],
});
