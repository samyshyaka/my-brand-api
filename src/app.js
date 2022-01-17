import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/dbConn.js';
import index from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from "fs/promises";
const PORT = process.env.PORT || 9000;

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

app.use("/Api/v1", index);

mongoose.connection.once('open', () => {
  console.log('connected to mongoDB');
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})

export default app