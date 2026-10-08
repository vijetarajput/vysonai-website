import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // Service pages that are not built yet go to the services section on Home. Temporary (307)
      // so search engines keep the old URLs. When a page is built, add its slug to the list below.
      { source: "/services", destination: "/#services", permanent: false },
      {
        source: "/services/:path((?!ai-receptionist$).*)",
        destination: "/#services",
        permanent: false,
      },
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
