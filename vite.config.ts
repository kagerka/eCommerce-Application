import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
});
