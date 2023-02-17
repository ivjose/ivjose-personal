import { defineConfig } from 'astro/config';

// https://astro.build/config
import image from '@astrojs/image';
import tailwind from '@astrojs/tailwind';

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

    // fonts({
    //   url: [
    //     'https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&display=swap',
    //     'https://fonts.googleapis.com/css2?family=Caveat&display=swap',
    //   ],
    // }),
  ],
});
// font-family: 'Assistant', sans-serif;
// font-family: 'Caveat', cursive;
