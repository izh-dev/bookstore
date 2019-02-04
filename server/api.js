"use strict";

const koaBody = require("koa-body");
const cors = require("@koa/cors");

const Server = require('./server');
const data = require('./db/mock');

class API extends Server {
  constructor() {
    super();

    this.app.use(cors());

    this._initApi();
  }

  _initApi() {
    this.router.get("/api/books", (ctx, next) => {
      if (!data || !data.books) {
        ctx.body = {
          code: 404,
          message: "Books not found",
          success: false
        };

        return next();
      }
    
      ctx.body = {
        data: data.books,
        success: true
      };
    
      return next();
    });
    
    this.router.get("/api/books/:id", (ctx, next) => {
      const id = +ctx.params.id;
      const book = data.books.find(book => book.id === id);

      console.log(!book);
    
      if (!book) {
        ctx.body = {
          code: 404,
          message: `A book with the ID ${id} not found`,
          success: false
        };

        return next();
      }
    
      ctx.body = {
        data: book,
        success: true
      };
    
      return next();
    });
    
    this.router.post("/api/books", koaBody(), (ctx, next) => {
      const book = {
        id: data.books.length + 1,
        title: ctx.request.body.title,
        description: ctx.request.body.description,
        price: ctx.request.body.price
      };
    
      data.books.push(book);
    
      ctx.body = {
        data: book,
        success: true
      };
    
      return next();
    });
  }
}

module.exports = new API();