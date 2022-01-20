import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConn.js';
import index from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from "fs/promises";
const PORT = process.env.PORT || 9000;

dotenv.config();

//connect to mongoDB

connectDB();

const swaggerDocument  = JSON.parse(await readFile("./swagger.json"));

const app = express();
app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use("/api/v1", index);

app.get("/", (req, res) => {
  return res.status(200).send("The api is working perfectly")
})

app.get("*", (req, res) => {
  return res.status(500).send("server error")
})

mongoose.connection.once('open', () => {
  console.log('connected to mongoDB');
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})

export default app