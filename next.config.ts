import type { NextConfig } from "next";

// Export 100% estático: o build gera a pasta /out, que o Cloudflare Pages publica.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
