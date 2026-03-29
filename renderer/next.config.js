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

    const webpack = require('webpack');
    config.plugins.push(
      new webpack.DefinePlugin({
        global: 'window', 
      })
    );
    
    return config;
  },
};
