import { build } from 'vite';
import esbuild from 'esbuild';

// build the client
await build();

// build the server
await esbuild.build({
  entryPoints: ['src/server/main.js'],
  bundle: true,
  platform: 'node',
  target: 'node16',
  outdir: 'dist/server',
  minify: true,
  packages: 'external',
  format: 'esm',
  splitting: true,
});
