import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Optionally, add any other Next.js config below
  reactStrictMode: true,

  transpilePackages: ["next-mdx-remote"],
};

export default withNextIntl(nextConfig);
