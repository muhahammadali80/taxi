import type { NextConfig } from "next";
import os from "node:os";

function lanDevOrigins() {
  const origins = ["localhost", "127.0.0.1"];
  for (const addrs of Object.values(os.networkInterfaces())) {
    for (const nic of addrs ?? []) {
      if (nic.family === "IPv4" && !nic.internal) origins.push(nic.address);
    }
  }
  return origins;
}

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: lanDevOrigins(),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
