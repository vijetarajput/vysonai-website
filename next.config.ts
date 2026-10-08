import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The service pages were removed and will be rebuilt. Until then, send visitors to the
      // services section on Home. These are temporary (307) so search engines keep the old URLs.
      { source: "/services", destination: "/#services", permanent: false },
      { source: "/services/:path*", destination: "/#services", permanent: false },
      // The old Solutions pages never came back: same temporary destination.
      { source: "/solutions", destination: "/#services", permanent: false },
      { source: "/solutions/:path*", destination: "/#services", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
