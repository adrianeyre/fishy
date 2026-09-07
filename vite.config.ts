import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * One config for the app and for the tests.
 *
 * scumm keeps `vite.config.ts` and `vitest.config.ts` apart because its test
 * run needs aliases and a defined global that the browser build also needs, and
 * duplicating them was the lesser evil. Nothing here is shared that way, so a
 * second file would only be a second place to forget.
 */
export default defineConfig({
  // Relative, not '/fishy/': GitHub Pages serves this from a repository
  // subpath, and relative asset URLs are the one form that works both there and
  // from `vite preview` at the root.
  base: './',
  plugins: [react()],
  build: {
    // The release workflow uploads this directory to Pages.
    outDir: 'dist-web',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2022',
  },
  server: {
    host: true,
    port: 3000,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
  test: {
    // The game is all DOM: window listeners, element sizes, images.
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/interfaces/**', 'src/setupTests.ts'],
    },
  },
});
