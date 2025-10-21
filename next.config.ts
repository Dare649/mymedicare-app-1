import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ❌ remove or comment out this line if you have it:
  // output: "export",
  
  // ✅ optional optimizations
  reactStrictMode: true,
  experimental: {
    // serverActions expects an object with optional properties (bodySizeLimit, allowedOrigins).
    // Provide an empty object to enable server actions with default options.
    serverActions: {},
  },
};

export default nextConfig;
