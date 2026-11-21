import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/opengraph-image": ["./public/fonts/**/*"],
    "/read/[fic]/opengraph-image": [
      "./public/fonts/**/*",
      "./fanfictions/*/info.json",
      "./fanfictions/*/chapters/*.html",
    ],
  },
};

const isProd = process.env.NODE_ENV === "production";

export default isProd
  ? withSentryConfig(nextConfig, {
      org: "rootscript",
      project: "kaishouripl",
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      webpack: {
        automaticVercelMonitors: true,
        treeshake: {
          removeDebugLogging: true,
        },
      },
    })
  : nextConfig;