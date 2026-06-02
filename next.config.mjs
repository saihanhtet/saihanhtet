/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@hugeicons/react", "@hugeicons/core-free-icons"],
  experimental: {
    optimizePackageImports: [
      "hugeicons-react",
      "@hugeicons/core-free-icons",
      "lucide-react",
    ],
  },
};

export default nextConfig;
