import express from 'express';
import mongoose from 'mongoose';
import index from './routes/index.js';

const url = "mongodb://localhost/ArticlesDBex";

const app = express();

mongoose.connect(url);
const con = mongoose.connection;


con.on("connected", () => {
  console.log("connected..");
  app.listen(9000, () => {
    console.log("server started");
  })
});

con.on("error", err => {
  console.log(err);
})

app.use("/", index);