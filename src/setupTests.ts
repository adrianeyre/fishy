// jest-dom v7 ships a Vitest entry point that registers the matchers against
// Vitest's `expect` rather than Jest's.
import '@testing-library/jest-dom/vitest';

// jsdom has no layout engine and so no matchMedia. The game only ever reads it.
window.matchMedia =
  window.matchMedia ||
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList);
