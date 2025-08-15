const IS_ANALYZE = process.env.ANALYZE === 'true';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_TEST = process.env.NODE_ENV === 'test';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DISABLE_DEV_CONSOLE = process.env.NEXT_PUBLIC_DISABLE_DEV_CONSOLE === 'true';
const IS_CI = process.env.CI;

// Disable nextjs telemetry
process.env.NEXT_TELEMETRY_DISABLED = '1';

/** @type {import('next').NextConfig} */
let nextConfig = {
  compiler: {
    // disable console logs in production but enable on CI
    removeConsole: !IS_CI && (DISABLE_DEV_CONSOLE || IS_PRODUCTION),
  },
  productionBrowserSourceMaps: true,
  experimental: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
    typedRoutes: true,
    // Disable to ensure build works
    // https://github.com/vercel/next.js/issues/32314
    esmExternals: false,
    // Enable the OpenTelemetry integration
    // https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry#using-vercelotel
    // https://maxwellweru.com/blog/2024/03/nextjs-opentelemetry-with-azure-monitor
    instrumentationHook: true,
  },
  images: {
    remotePatterns: getRemotePatterns(),
  },
  webpack: (config) => {
    // https://github.com/getsentry/sentry-javascript/issues/12077#issuecomment-2122694583
    config.ignoreWarnings = [
      {
        module: /@opentelemetry\/instrumentation/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    // Allow .js import specifiers to resolve to .ts files in local packages (e.g., Prisma generated TS importing .js)
    config.resolve = config.resolve || {};
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true, // todo: remove this after demo
  },
  typescript: {
    ignoreBuildErrors: true, // todo: remove this after demo
  },
};

if (IS_ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer');
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;

function getRemotePatterns() {
  // add here the remote patterns for your images
  const remotePatterns = [];

  if (SUPABASE_URL) {
    const hostname = new URL(SUPABASE_URL).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        },
      ];
}
