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
    return [
      {
        source: "/api/:path*",
        destination:
          "http://127.0.0.1:4523/m1/4782268-4436149-default/api/:path*",
        // destination: 'http://localhost:3000/api/:path*'
      },
    ];
  },
};

module.exports = nextConfig;
