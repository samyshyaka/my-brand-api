import express from 'express';
import mongoose from 'mongoose';
import index from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const url = "mongodb://localhost/ArticlesDBex";

const app = express();
app.use(express.json());

mongoose.connect(url);
const con = mongoose.connection;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: "1.0.0",
      title: "My Brand API",
      description: "Personal Portfolio",
      contact: {
        name: "Samuel Shyaka Dushimimana"
      },
      servers: ["http://localhost:9000/articles"]
    }
  },
  apis: ["./src/routes/articles.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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