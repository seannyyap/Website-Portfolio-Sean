/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const baseHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ]

    if (process.env.ENABLE_HSTS === "true") {
      baseHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000",
      })
    }

    return [
      {
        source: "/:path*",
        headers: baseHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
