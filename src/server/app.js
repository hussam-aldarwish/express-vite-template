import express from 'express';
import apiRouter from './api.js';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { usePathFromURL } from './hooks.js';

const { COOKIE_SECRET = 'secret', NODE_ENV, PORT = '3000' } = process.env;
const isDevelopment = NODE_ENV !== 'production';
const { __dirname } = usePathFromURL(import.meta.url);

const app = express();
app.set('port', normalizePort(PORT));

let fetch, vitePort;
if (isDevelopment) {
  fetch = (await import('node-fetch')).default;
  const vite = await (
    await import('vite')
  ).createServer({
    clearScreen: false,
  });
  await vite.listen();
  vitePort = vite.config.server.port;
  console.log(
    `Vite server listening on port http://localhost:${vitePort} in development mode ✈️`
  );

  app.use((req, res, next) => {
    if (req.path.match(/\.\w+$/)) {
      fetch(`http://localhost:${vitePort}${req.path}`).then((response) => {
        if (!response.ok) return next();
        res.redirect(response.url);
      });
    } else next();
  });
} else {
  app.use((await import('compression')).default());
  app.use(
    express.static(path.resolve(__dirname, '../client'), { index: false })
  );
}

app.use(logger('dev', { skip: (_, res) => res.statusCode < 400 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use('/api', apiRouter);

app.use('*', (req, res, next) => {
  if (isDevelopment) {
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
  } else res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

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
