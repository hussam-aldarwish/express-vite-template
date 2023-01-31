import app from './app.js';
import server from './server.js';

export function init() {
  server.listen(app.get('port'));
}

init();
