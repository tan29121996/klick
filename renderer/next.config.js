module.exports = {
  output: 'export', 
  
  images: {
    unoptimized: true,
    domains: ['cloudflare-ipfs.com', 'loremflickr.com', 'avatars.githubusercontent.com'], 
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }
    
    return config;
  },
};
