/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  async rewrites() {
    console.log("Configuring rewrites");
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:9090/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
