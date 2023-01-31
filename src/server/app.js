import express from 'express';
import apiRouter from './api.js';
import path from 'node:path';

const { NODE_ENV, PORT = 3000 } = process.env;
const isProduction = NODE_ENV === 'production';

const app = express();
app.set('port', normalizePort(PORT));

if (isProduction) {
  app.use(express.static(path.resolve('dist/client')));
}

app.use('/api', apiRouter);

if (isProduction) {
  app.use('*', (_, res) => {
    res.sendFile(path.resolve('dist/client/index.html'));
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
