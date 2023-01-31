import * as Vite from 'vite';
import fetch from 'node-fetch';
import app from '../src/server/app.js';
import { init } from '../src/server/main.js';

// Start the Express server in development mode.
init();

// Start the Vite server in development mode.
const vite = await Vite.createServer({
  clearScreen: false,
  configFile: 'vite.config.js',
});
await vite.listen();
const vitePort = vite.config.server.port;
console.log(`Vite server listening on port ${vitePort} in development mode ✈️`);

app.use((req, res, next) => {
  if (req.path.match(/\.\w+$/)) {
    fetch(`http://localhost:${vitePort}${req.path}`).then((response) => {
      if (!response.ok) return next();
      res.redirect(response.url);
    });
  } else next();
});
const layer = app._router.stack.pop();
app._router.stack = [
  ...app._router.stack.slice(0, 2),
  layer,
  ...app._router.stack.slice(2),
];

app._router.stack.pop();
app.get('/*', (req, res, next) => {
  if (req.path.match(/\.\w+$/)) return next();
  fetch(`http://localhost:${vitePort}`)
    .then((res) => res.text())
    .then((content) =>
      content.replace(
        /(\/@react-refresh|\/@vite\/client)/g,
        `http://localhost:${vitePort}$1`
      )
    )
    .then((content) => res.header('Content-Type', 'text/html').send(content));
});
