import express from 'express';
import apiRouter from './api.js';
import path from 'node:path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const { COOKIE_SECRET, NODE_ENV, PORT = 3000 } = process.env;
const isProduction = NODE_ENV === 'production';

const app = express();
app.set('port', normalizePort(PORT));

if (isProduction) {
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
app.use(cookieParser(COOKIE_SECRET || 'secret'));
app.use(express.static(path.resolve('dist/client')));
app.use('/api', apiRouter);
app.use('*', (_, res) => {
  res.sendFile(path.resolve('dist/client/index.html'));
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
