module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui', '@librora/api'],
  images: {
    domains: ['localhost', 's3.us-west-2.amazonaws.com', 'librora.vercel.app'],
  },
  // reactStrictMode: false,
}
