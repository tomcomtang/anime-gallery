/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 确保trailingSlash设置为true，这有助于静态导出的路由工作正常
  trailingSlash: true,
  // 如果您的网站不是部署在域名根目录，而是在子目录下，请取消下面这行的注释并修改
  // basePath: '/your-repo-name',
};

export default nextConfig;
