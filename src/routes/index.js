import express from 'express';

import ArticleRouter from './articles.js';
import ProfileRouter from './profiles.js';
import QueryRouter from './queries.js';
import UserRouter from './users.js';
import AuthRouter from './login.js';
import CommentRouter from './comments.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use("/Articles", ArticleRouter);
app.use("/Profiles", ProfileRouter);
app.use("/Queries", QueryRouter);
app.use("/Users", UserRouter);
app.use("/Login", AuthRouter);
app.use("/Comments", CommentRouter);

export default app

