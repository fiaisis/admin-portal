/** @type {import('next').NextConfig} */
// unable to import constants from src/utils here
const BASE_URL = process.env.NODE_ENV !== 'production' ? "" : '/admin-portal';

const nextConfig = {
    output: "standalone",
    assetPrefix: `${BASE_URL}`,
    basePath: `${BASE_URL}`, 
};

export default nextConfig;
