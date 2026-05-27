/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: process.cwd(),
  basePath: isGitHubActions ? '/valkompass' : '',
  assetPrefix: isGitHubActions ? '/valkompass/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? '/valkompass' : ''
  }
};

export default nextConfig;
