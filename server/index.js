import express from "express";
import CORS from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import Routes from "./routes/routes.js";

dotenv.config();

const app = express();

app.use(
  CORS({
    origin: "*",
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(Routes);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    const connection = await dbConnect.getConnection();
    console.log("Database connected");
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
