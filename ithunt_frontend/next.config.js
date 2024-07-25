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
        //source: "/:path*",
        //"/api/:path*",
        //destination:
          //"http://127.0.0.1:4523/m1/4782268-4436149-default/api/:path*",
         // "http://localhost:9090/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
