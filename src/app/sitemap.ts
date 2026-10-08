import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Add each new public page here when it is built.
const paths = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.8,
  }));
}
