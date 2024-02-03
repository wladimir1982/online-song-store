const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      theme: path.resolve(__dirname, 'src/theme'),
      store: path.resolve(__dirname, 'src/store'),
      services: path.resolve(__dirname, 'src/services'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      hoc: path.resolve(__dirname, 'src/hoc'),
      assets: path.resolve(__dirname, 'src/assets'),
      constants: path.resolve(__dirname, 'src/constants'),
      routes: path.resolve(__dirname, 'src/routes'),
      containers: path.resolve(__dirname, 'src/containers'),
      interfaces: path.resolve(__dirname, 'src/interfaces')
    }
  };

  return config;
};
