import express from 'express';

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.set('port', normalizePort(PORT));
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
