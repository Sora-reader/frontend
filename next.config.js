const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_PORT: process.env.BACKEND_PORT,
    RESIZE_URL: process.env.RESIZE_URL,
    SENTRY_URL: process.env.SENTRY_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  },
};
const bundleAnalyzerConfig = {
  enabled: true,
};
const pwaConfig = {
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: true,
}
const sentryConfig = {};

if (process.env.NODE_ENV !== 'development') {
  const withPWA = require('next-pwa');
  module.exports = withPWA({
    ...module.exports,
    pwa: pwaConfig,
  });

  if (process.env.SENTRY_DSN) 
  {
    const { withSentryConfig } = require("@sentry/nextjs");
    module.exports = withSentryConfig(module.exports, sentryConfig); 
  }
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')()
    module.exports = withBundleAnalyzer(module.exports, bundleAnalyzerConfig);
  }
}
