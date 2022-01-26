import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () => {
    try {
      if (process.env.NODE_ENV == "test") {
        console.log("Connected to the test database");
        mongoose.connect(process.env.TEST_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      } else if (process.env.NODE_ENV == "development") {
        console.log("Connected to the dev database");
        mongoose.connect(process.env.DEV_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      } else {
        mongoose.connect(process.env.MONGO_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  };