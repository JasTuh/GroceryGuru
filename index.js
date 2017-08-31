const body = require('body-parser');
const co = require('co');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

co(function* () {
  yield app.prepare();
  const server = express();
  server.use(cookieParser());
  server.use(body.json());
  server.get('*', (req, res) => handle(req, res));
  server.listen(PORT);
  console.log(`Listening on ${PORT}`);
});
