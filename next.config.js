const dotenv = require("dotenv");

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
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  register: true,
  skipWaiting: true,
};
const sentryConfig = {};

if (process.env.NODE_ENV !== "development") {
  const withPWA = require("next-pwa");
  module.exports = withPWA({
    ...module.exports,
    pwa: pwaConfig,
  });

  if (process.env.SENTRY_DSN) {
    const { withSentryConfig } = require("@sentry/nextjs");
    module.exports = withSentryConfig(module.exports, sentryConfig);
  }
  if (process.env.ANALYZE === "true") {
    const withBundleAnalyzer = require("@next/bundle-analyzer")();
    module.exports = withBundleAnalyzer(module.exports, bundleAnalyzerConfig);
  }
}

/**
 * Remove undefined values so Next.js doesn't complain during serialization. Verified as of v11.1.2.
 */
const removeUndefined = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeUndefined(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
const next = require("next/dist/lib/is-serializable-props");
const isSerializableProps = next.isSerializableProps;
next.isSerializableProps = (page, method, input) =>
  isSerializableProps(page, method, removeUndefined(input));
