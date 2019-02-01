"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const books = [
  {
    id: 1,
    title: "Book 1",
    desciption: "a description of the book 1",
    price: "free"
  },
  {
    id: 2,
    title: "Book 2",
    desciption: "a description of the book 2",
    price: "free"
  },
  {
    id: 3,
    title: "Book 3",
    desciption: "a description of the book 3",
    price: "$40"
  },
  {
    id: 4,
    title: "Book 4",
    desciption: "a description of the book 4",
    price: "$0.3"
  },
  {
    id: 5,
    title: "Book 5",
    desciption: "a description of the book 5",
    price: "free"
  }
]; // tmp

app.use(router.routes()).use(router.allowedMethods());
app.use(
  bodyParser({
    urlencoded: true
  })
);
app.use(cors());

router.get("/api/books", (ctx, next) => {
  if (!books) {
    ctx.body = {
      code: 404,
      message: "Books not found",
      success: false
    };
  }

  ctx.body = {
    data: books,
    success: true
  };

  return next();
});

router.get("/api/books/:id", (ctx, next) => {
  const id = +ctx.params.id;
  const book = books.find(book => book.id === id);

  if (!book) {
    ctx.body = {
      code: 404,
      message: `A book with the ID ${id} not found`,
      success: false
    };
  }

  ctx.body = {
    data: book,
    success: true
  };

  return next();
});

// router.post("/api/books", (ctx, next) => { //  
//   console.log('ctx :: ', ctx.request);
//   const book = {
//     id: books.length + 1,
//     title: ctx.request.body.title,
//     description: ctx.request.body.description,
//     price: ctx.request.body.price
//   };

//   books.push(book);

//   ctx.body = {
//     data: book,
//     success: true
//   };

//   return next();
// });

const hostname = "localhost";
const port = 3001;

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
