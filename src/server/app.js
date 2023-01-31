import express from 'express';
import apiRouter from './api.js';
import path from 'node:path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

/**
 * @type {function fetch(url: RequestInfo, init?: RequestInit): Promise<Response>}
 */
let fetch;
let vitePort;
const { COOKIE_SECRET = 'secret', NODE_ENV, PORT = 3000 } = process.env;
const isDevelopment = NODE_ENV !== 'production';
const distPath = path.resolve('dist/client');

if (isDevelopment) {
  fetch = (await import('node-fetch')).default;
  const vite = (await import('vite')).createServer({
    clearScreen: false,
    configFile: 'vite.config.js',
  });
  await vite.listen();
  vitePort = vite.config.server.port;
  console.log(
    `Vite server listening on port http://localhost:${vitePort} in development mode ✈️`
  );
}

const app = express();
app.set('port', normalizePort(PORT));

if (!isDevelopment) {
  app.use(compression());
}
app.use(
  logger('dev', {
    skip: function (_, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
if (isDevelopment) {
  app.use((req, res, next) => {
    if (req.path.match(/\.\w+$/)) {
      fetch(`http://localhost:${vitePort}${req.path}`).then((response) => {
        if (!response.ok) return next();
        res.redirect(response.url);
      });
    } else next();
  });
} else {
  app.use(express.static(distPath));
}
app.use('/api', apiRouter);
if (isDevelopment) {
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
} else {
  app.use('*', (_, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

export default app;

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
