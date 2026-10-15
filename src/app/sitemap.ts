import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

const paths = ["/", "/quiz/", "/about/", "/contact/", "/privacy/", "/cookies/", "/affiliate-disclosure/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
