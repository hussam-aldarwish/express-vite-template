import app from './app.js';
import server from './server.js';

export function init() {
  server.listen(app.get('port'));
}

// call init() if called from the command line
if (
  process.env.NODE_ENV === 'production' &&
  process.argv[1] === process.cwd()
) {
  init();
}
