/** @type {import('next').NextConfig} */
const configuredBasePath = process.env.NEXT_PUBLIC_REGION_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  basePath: configuredBasePath,
  assetPrefix: configuredBasePath ? `${configuredBasePath}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: configuredBasePath
  }
};

export default nextConfig;
