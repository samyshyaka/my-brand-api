import express from 'express';
import ArticleRouter from './articles.js';
import ProfileRouter from './profiles.js';
import QueryRouter from './queries.js';
import UserRouter from './users.js';
import LoginRouter from './login.js';

const app = express();

app.use("/Articles", ArticleRouter);
app.use("/Profiles", ProfileRouter);
app.use("/Queries", QueryRouter);
app.use("/Users", UserRouter);
app.use("/Login", LoginRouter);

app.use(express.json());

export default app

