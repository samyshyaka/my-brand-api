import express from 'express';
import mongoose from 'mongoose';
const url = "mongodb://localhost/ArticlesDBex";

const app = express();

mongoose.connect(url);
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected..");
});

app.use(express.json());

import ArticleRouter from './routes/articles.js';
import ProfileRouter from './routes/profiles.js';
import QueryRouter from './routes/queries.js';
import UserRouter from './routes/users.js';
import LoginRouter from './routes/login.js';

app.use("/Articles", ArticleRouter);
app.use("/Profiles", ProfileRouter);
app.use("/Queries", QueryRouter);
app.use("/Users", UserRouter);
app.use("/Login", LoginRouter);

app.listen(9000, () => {
  console.log("server started");
});
