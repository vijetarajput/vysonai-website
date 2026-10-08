import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The Solutions pages were removed. Their content now lives on the service pages.
      { source: "/solutions", destination: "/#services", permanent: true },
      { source: "/solutions/gyms", destination: "/services/whatsapp-automation", permanent: true },
      { source: "/solutions/clinics", destination: "/services/whatsapp-automation", permanent: true },
      // The CRM service was renamed to the AI Dashboard.
      {
        source: "/services/crm",
        destination: "/services/ai-dashboard",
        permanent: true,
      },
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
