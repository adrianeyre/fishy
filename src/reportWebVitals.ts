import type { Metric } from 'web-vitals';

/**
 * web-vitals v6 renamed every getter (`getCLS` -> `onCLS`), dropped the
 * `ReportHandler` type in favour of `Metric`, and replaced FID with INP —
 * FID was retired as a Core Web Vital, so there is nothing to call in its place.
 */
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
