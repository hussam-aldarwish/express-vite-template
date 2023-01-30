import { build } from 'vite';
import esbuild from 'esbuild';
import packageJson from '../package.json' assert { type: 'json' };

// build the client
await build();

// build the server
await esbuild.build({
  entryPoints: ['src/server/main.js'],
  bundle: true,
  platform: 'node',
  target: 'node14',
  outdir: 'dist/server',
  external: Object.keys({ ...packageJson.dependencies }),
  minify: true,
});
