const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/perf.mjs',
  output: {
    library: "perf",
    filename: 'index.js',
    path: path.resolve(__dirname, 'bundle'),
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
      crypto: false,
      perf_hooks: false,
    }
  },
};
