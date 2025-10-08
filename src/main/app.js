const express = require('express');
const setupContainer = require('./container');

class App {
  constructor({ router }) {
    this.server = express();

    this.middlewares();

    this.routes(router);
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes(router) {
    this.server.use(router);
  }
}

module.exports = App;