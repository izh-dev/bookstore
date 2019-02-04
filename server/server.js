"use strict";

const Koa = require("koa");
const Router = require("koa-router");

class Server {
  constructor() {
    this.app = new Koa();
    this.router = new Router();

    this._init();
  }

  _init() {
    this.app
      .use(this.router.routes())
      .use(this.router.allowedMethods());

    this._listen();
  }

  _listen() {
    const hostname = "localhost";
    const port = 3001;

    this.app.listen(port, hostname, () => {
      console.log(`Server is running at http://${hostname}:${port}`);
    });
  }
}

module.exports = Server;
